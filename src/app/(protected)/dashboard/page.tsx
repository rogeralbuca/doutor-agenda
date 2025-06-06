import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { AuthService } from "@/services/auth-service";
import { DashboardService } from "@/services/dashboard-service";

import { AppointmentsCard } from "./components/appointments-card";
import { AppointmentsChart } from "./components/appointments-chart";
import { DashboardMetrics } from "./components/dashboard-metrics";
import { DoctorsCard } from "./components/doctors-card";
import { SpecialtiesCard } from "./components/specialties-card";

const DashboardPage = async () => {
  const { user } = await AuthService.getAuthenticatedUserWithClinic();
  const dashboardData = await DashboardService.getDashboardData(user.id);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Acesse uma visão geral detalhada das principais métricas e
            resultados dos pacientes
          </PageDescription>{" "}
        </PageHeaderContent>
      </PageHeader>
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
