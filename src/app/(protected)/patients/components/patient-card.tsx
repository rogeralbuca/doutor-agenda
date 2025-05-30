import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patientsTable } from "@/db/schema";
import { UserAvatar } from "../../components/user-avatar";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const formatPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, "");

    // Format as (XX) XXXXX-XXXX
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }

    return phone;
  };

  const getSexLabel = (sex: string) => {
    return sex === "male" ? "Masculino" : "Feminino";
  };

  return (
    <Card>
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserAvatar userName={patient.name} />
          {patient.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4" />
          {patient.email}
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4" />
          {formatPhoneNumber(patient.phoneNumber)}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary">{getSexLabel(patient.sex)}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
