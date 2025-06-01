import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
    appointmentsTable,
    doctorsTable,
    patientsTable,
    usersToClinicsTable,
} from "@/db/schema";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export class DashboardService {
    static async getDashboardData(userId: string) {
        // Buscar clínica do usuário
        const userClinic = await db.query.usersToClinicsTable.findFirst({
            where: eq(usersToClinicsTable.userId, userId),
        });

        if (!userClinic) {
            throw new Error("Clínica não encontrada");
        }

        const clinicId = userClinic.clinicId;

        // Buscar todos os dados necessários
        const [appointments, doctors, patients] = await Promise.all([
            // Agendamentos com relações
            db.query.appointmentsTable.findMany({
                where: eq(appointmentsTable.clinicId, clinicId),
                with: {
                    patient: true,
                    doctor: true,
                },
            }),
            // Médicos
            db.query.doctorsTable.findMany({
                where: eq(doctorsTable.clinicId, clinicId),
            }),
            // Pacientes
            db.query.patientsTable.findMany({
                where: eq(patientsTable.clinicId, clinicId),
            }),
        ]);

        // Calcular métricas
        const totalRevenue = appointments.reduce((sum, appointment) => {
            return sum + appointment.doctor.appointmentPriceInCents;
        }, 0);

        // Médicos com contagem de agendamentos
        const doctorsWithAppointments = doctors.map((doctor) => ({
            ...doctor,
            appointmentCount: appointments.filter((app) => app.doctorId === doctor.id)
                .length,
        }));

        // Especialidades com contagem
        const specialtyCount = doctors.reduce(
            (acc, doctor) => {
                const appointmentCount = appointments.filter(
                    (app) => app.doctorId === doctor.id
                ).length;

                if (!acc[doctor.specialty]) {
                    acc[doctor.specialty] = 0;
                }
                acc[doctor.specialty] += appointmentCount;
                return acc;
            },
            {} as Record<string, number>
        );

        const totalAppointmentsBySpecialty = Object.values(specialtyCount).reduce(
            (sum, count) => sum + count,
            0
        );

        const specialties = Object.entries(specialtyCount).map(([name, count]) => ({
            name,
            count,
            percentage: totalAppointmentsBySpecialty > 0
                ? Math.round((count / totalAppointmentsBySpecialty) * 100)
                : 0,
        }));

        // Dados do gráfico - últimos 7 dias (baseado na data atual do servidor)
        const today = dayjs().startOf('day');
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = today.subtract(i, "day");
            const dayAppointments = appointments.filter((appointment) =>
                dayjs(appointment.date).isSame(date, "day")
            );

            return {
                day: date.format("ddd"),
                appointments: dayAppointments.length,
            };
        }).reverse();        // Buscar os 4 últimos agendamentos (mais recentes)
        const recentAppointments = appointments
            .sort((a, b) => dayjs(b.date).diff(dayjs(a.date))) // Ordenar do mais recente para o mais antigo
            .slice(0, 4); // Pegar os 4 primeiros (mais recentes)

        return {
            metrics: {
                totalRevenue,
                totalAppointments: appointments.length,
                totalPatients: patients.length,
                totalDoctors: doctors.length,
            },
            doctorsWithAppointments,
            specialties,
            appointments: recentAppointments,
            chartData: last7Days,
        };
    }
}
