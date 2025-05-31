import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export class PatientsService {
    static async getPatientsByClinicId(clinicId: string) {
        return await db.query.patientsTable.findMany({
            where: eq(patientsTable.clinicId, clinicId),
            orderBy: (patients, { asc }) => [asc(patients.name)],
        });
    }

    static async getPatientById(id: string) {
        return await db.query.patientsTable.findFirst({
            where: eq(patientsTable.id, id),
        });
    }

    static async getPatientByIdAndClinicId(id: string, clinicId: string) {
        return await db.query.patientsTable.findFirst({
            where: (patients, { and, eq }) =>
                and(
                    eq(patients.id, id),
                    eq(patients.clinicId, clinicId)
                ),
        });
    }
}
