import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error("Stripe secret key not found");
    }

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
        throw new Error("Stripe signature not found");
    }

    const text = await request.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-05-28.basil",
    });

    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Received webhook event:", event.type);

    switch (event.type) {
        case "invoice.paid": {
            const invoice = event.data.object as Stripe.Invoice;
            console.log("Invoice paid event data:", invoice);

            // Para invoices de subscription, precisamos acessar os dados através do parent
            if (invoice.parent?.type === 'subscription_details') {
                const subscriptionDetails = invoice.parent.subscription_details;
                if (!subscriptionDetails) {
                    console.error("No subscription details found in invoice");
                    break;
                }
                const subscriptionId = subscriptionDetails.subscription as string;
                const customerId = invoice.customer as string;

                if (!subscriptionId) {
                    console.error("No subscription ID found in invoice");
                    break;
                }

                // Buscar a subscription para obter os metadados
                try {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                    console.log("Retrieved subscription:", subscription);

                    const userId = subscription.metadata?.userId;
                    if (!userId) {
                        console.error("User ID not found in subscription metadata");
                        break;
                    }

                    await db
                        .update(usersTable)
                        .set({
                            stripeSubscriptionId: subscriptionId,
                            stripeCustomerId: customerId,
                            plan: "basic",
                        })
                        .where(eq(usersTable.id, userId));

                    console.log(`Updated user ${userId} with subscription ${subscriptionId}`);
                } catch (error) {
                    console.error("Error retrieving subscription:", error);
                }
            }
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            console.log("Subscription deleted event data:", subscription);

            const userId = subscription.metadata?.userId;
            if (!userId) {
                console.error("User ID not found in subscription metadata");
                break;
            }

            await db
                .update(usersTable)
                .set({
                    stripeSubscriptionId: null,
                    stripeCustomerId: null,
                    plan: null,
                })
                .where(eq(usersTable.id, userId));

            console.log(`Removed subscription for user ${userId}`);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({
        received: true,
    });
};