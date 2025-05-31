import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { getDashboardData } from "./helpers/dashboard-data";
import { DashboardMetrics } from "./components/dashboard-metrics";
import { AppointmentsChart } from "./components/appointments-chart";
import { DoctorsCard } from "./components/doctors-card";
import { SpecialtiesCard } from "./components/specialties-card";
import { AppointmentsCard } from "./components/appointments-card";

const DashboardPage = async () => {
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

  const dashboardData = await getDashboardData(session.user.id);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Acesse uma visão geral detalhada das principais métricas e
            resultados dos pacientes
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>{" "}
      <PageContent>
        <div className="space-y-6">
          {/* Métricas principais */}
          <DashboardMetrics {...dashboardData.metrics} />

          {/* Gráfico e cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Gráfico de agendamentos */}
            <div className="md:col-span-1">
              <AppointmentsChart data={dashboardData.chartData} />
            </div>

            {/* Card de médicos */}
            <div className="md:col-span-1">
              <DoctorsCard doctors={dashboardData.doctorsWithAppointments} />
            </div>
          </div>

          {/* Cards inferiores */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card de especialidades */}
            <div className="md:col-span-1">
              <SpecialtiesCard specialties={dashboardData.specialties} />
            </div>

            {/* Card de agendamentos */}
            <div className="md:col-span-1">
              <AppointmentsCard appointments={dashboardData.appointments} />
            </div>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
