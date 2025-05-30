import { z } from "zod";

export const upsertAppointmentSchema = z.object({
    id: z.string().uuid().optional(),
    patientId: z.string().uuid({
        message: "Paciente é obrigatório.",
    }),
    doctorId: z.string().uuid({
        message: "Médico é obrigatório.",
    }),
    date: z.string().min(1, {
        message: "Data é obrigatória.",
    }),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
