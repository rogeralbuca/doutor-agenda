import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export class DoctorsService {
    static async getDoctorsByClinicId(clinicId: string) {
        return await db.query.doctorsTable.findMany({
            where: eq(doctorsTable.clinicId, clinicId),
            orderBy: (doctors, { asc }) => [asc(doctors.name)],
        });
    }

    static async getDoctorById(id: string) {
        return await db.query.doctorsTable.findFirst({
            where: eq(doctorsTable.id, id),
        });
    }

    static async getDoctorByIdAndClinicId(id: string, clinicId: string) {
        return await db.query.doctorsTable.findFirst({
            where: (doctors, { and, eq }) =>
                and(
                    eq(doctors.id, id),
                    eq(doctors.clinicId, clinicId)
                ),
        });
    }
}
