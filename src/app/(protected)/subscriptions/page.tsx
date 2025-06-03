import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionCard } from "./components/subscription-card";

const SubscriptionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        {" "}
        <PageHeaderContent>
          <PageTitle>Assinaturas</PageTitle>
          <PageDescription>
            Gerencie seu plano de assinatura e explore opções para expandir as
            funcionalidades da sua clínica
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div className="grid gap-6">
          <SubscriptionCard
            active={session.user.plan === "basic"}
            userEmail={session.user.email}
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionsPage;
