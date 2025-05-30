import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import AddPatientButton from "./components/add-patient-button";
import PatientCard from "./components/patient-card";

const PatientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic.id),
    orderBy: (patients, { asc }) => [asc(patients.name)],
  });

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
        </PageActions>
      </PageHeader>
      <PageContent>
        {patients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground text-lg font-medium">
              Nenhum paciente cadastrado
            </p>
            <p className="text-muted-foreground text-sm">
              Adicione seu primeiro paciente para começar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
