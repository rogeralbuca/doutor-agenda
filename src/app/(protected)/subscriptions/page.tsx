import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { SubscriptionCard } from "./components/subscription-card";

const SubscriptionsPage = async () => {
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
          <SubscriptionCard />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionsPage;
