import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export class AuthService {
    static async getAuthenticatedUser() {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            redirect("/authentication");
        }

        return session.user;
    }

    static async getUserClinic(userId: string) {
        const clinics = await db.query.usersToClinicsTable.findMany({
            where: eq(usersToClinicsTable.userId, userId),
        });

        if (clinics.length === 0) {
            redirect("/clinic-form");
        }

        return clinics[0];
    }

    static async getAuthenticatedUserWithClinic() {
        const user = await this.getAuthenticatedUser();

        if (!user.clinic) {
            redirect("/clinic-form");
        }

        return { user, clinic: user.clinic };
    }

    static async validateUserAccess() {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            redirect("/authentication");
        }

        const clinics = await db.query.usersToClinicsTable.findMany({
            where: eq(usersToClinicsTable.userId, session.user.id),
        });

        if (clinics.length === 0) {
            redirect("/clinic-form");
        }

        return {
            user: session.user,
            clinicId: clinics[0].clinicId,
        };
    }
}
