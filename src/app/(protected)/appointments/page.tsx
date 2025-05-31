import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { AuthService } from "@/services/auth-service";
import { AppointmentsService } from "@/services/appointments-service";
import { DoctorsService } from "@/services/doctors-service";
import { PatientsService } from "@/services/patients-service";
import AddAppointmentButton from "./components/add-appointment-button";
import AppointmentsClientPage from "./components/appointments-client-page";

const AppointmentsPage = async () => {
  const { user, clinic } = await AuthService.getAuthenticatedUserWithClinic();

  const [appointments, doctors, patients] = await Promise.all([
    AppointmentsService.getAppointmentsByClinicId(clinic.id),
    DoctorsService.getDoctorsByClinicId(clinic.id),
    PatientsService.getPatientsByClinicId(clinic.id),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>{" "}
        <PageActions>
          <AddAppointmentButton patients={patients} doctors={doctors} />
        </PageActions>
      </PageHeader>
      <PageContent>
        <AppointmentsClientPage
          appointments={appointments}
          patients={patients}
          doctors={doctors}
        />
      </PageContent>
    </PageContainer>
  );
};

export default AppointmentsPage;
