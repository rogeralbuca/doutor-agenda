"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { z } from "zod";

const deleteAppointmentSchema = z.object({
  appointmentId: z.string().uuid(),
});

export const deleteAppointmentAction = actionClient
  .schema(deleteAppointmentSchema)
  .action(async ({ parsedInput: { appointmentId } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      redirect("/authentication");
    }

    if (!session.user.clinic) {
      redirect("/clinic-form");
    }

    try {
      // Verificar se o agendamento pertence à clínica do usuário
      const appointment = await db.query.appointmentsTable.findFirst({
        where: eq(appointmentsTable.id, appointmentId),
      });

      if (!appointment) {
        throw new Error("Agendamento não encontrado");
      }

      if (appointment.clinicId !== session.user.clinic.id) {
        throw new Error(
          "Você não tem permissão para cancelar este agendamento",
        );
      }

      // Deletar o agendamento
      await db
        .delete(appointmentsTable)
        .where(eq(appointmentsTable.id, appointmentId));

      revalidatePath("/appointments");

      return {
        success: true,
        message: "Agendamento cancelado com sucesso",
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Erro ao cancelar agendamento",
      );
    }
  });
