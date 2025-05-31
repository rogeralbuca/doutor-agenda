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
import { PatientsService } from "@/services/patients-service";
import AddPatientButton from "./components/add-patient-button";
import PatientsList from "./components/patients-list";

const PatientsPage = async () => {
  const { user, clinic } = await AuthService.getAuthenticatedUserWithClinic();
  const patients = await PatientsService.getPatientsByClinicId(clinic.id);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPatientButton />
        </PageActions>{" "}
      </PageHeader>
      <PageContent>
        <PatientsList patients={patients} />
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
