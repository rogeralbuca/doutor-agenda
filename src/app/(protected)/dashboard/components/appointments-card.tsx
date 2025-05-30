import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getNameInitials } from "@/helpers/name-initials-helper";
import { appointmentsTable, patientsTable, doctorsTable } from "@/db/schema";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

interface AppointmentsCardProps {
  appointments: AppointmentWithRelations[];
}

export function AppointmentsCard({ appointments }: AppointmentsCardProps) {
  // Os agendamentos já vêm filtrados e ordenados do servidor
  const upcomingAppointments = appointments;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agendamentos
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center text-sm">
            Nenhum agendamento próximo
          </p>
        ) : (
          upcomingAppointments.map((appointment, index) => (
            <div key={appointment.id}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getNameInitials(appointment.patient.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {appointment.patient.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {dayjs(appointment.date).format("DD/MM/YYYY [às] HH:mm")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {appointment.doctor.name}
                  </p>
                </div>
              </div>
              {index < upcomingAppointments.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
