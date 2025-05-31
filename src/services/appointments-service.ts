import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export class AppointmentsService {
    static async getAppointmentsByClinicId(clinicId: string) {
        return await db.query.appointmentsTable.findMany({
            where: eq(appointmentsTable.clinicId, clinicId),
            with: {
                patient: true,
                doctor: true,
            },
            orderBy: (appointments, { asc }) => [asc(appointments.date)],
        });
    }

    static async getAppointmentById(id: string) {
        return await db.query.appointmentsTable.findFirst({
            where: eq(appointmentsTable.id, id),
            with: {
                patient: true,
                doctor: true,
            },
        });
    }

    static async getAppointmentByIdAndClinicId(id: string, clinicId: string) {
        return await db.query.appointmentsTable.findFirst({
            where: (appointments, { and, eq }) =>
                and(
                    eq(appointments.id, id),
                    eq(appointments.clinicId, clinicId)
                ),
            with: {
                patient: true,
                doctor: true,
            },
        });
    }

    static async getAppointmentsWithRelationsByClinicId(clinicId: string) {
        return await db.query.appointmentsTable.findMany({
            where: eq(appointmentsTable.clinicId, clinicId),
            with: {
                patient: true,
                doctor: true,
            },
            orderBy: (appointments, { asc }) => [asc(appointments.date)],
        });
    }
}
