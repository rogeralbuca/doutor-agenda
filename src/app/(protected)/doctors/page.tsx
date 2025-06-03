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
import { DoctorsService } from "@/services/doctors-service";

import AddDoctorButton from "./components/add-doctor-button";
import DoctorsList from "./components/doctors-list";

const DoctorsPage = async () => {
  const { user, clinic } = await AuthService.getAuthenticatedUserWithClinic();
  const doctors = await DoctorsService.getDoctorsByClinicId(clinic.id);
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>
            Gerencie os médicos da sua clínica
          </PageDescription>{" "}
        </PageHeaderContent>
        <PageActions>
          <AddDoctorButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DoctorsList doctors={doctors} />
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
