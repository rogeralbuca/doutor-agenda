"use client";

import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteAppointmentAction } from "@/actions/delete-appointment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import EditAppointmentForm from "./edit-appointment-form";

dayjs.locale("pt-br");

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

interface TableActionsProps {
  appointment: AppointmentWithRelations;
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const TableActions = ({
  appointment,
  patients,
  doctors,
}: TableActionsProps) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const appointmentDate = dayjs(appointment.date);

  const { execute: deleteAppointment, isExecuting: isDeletingAppointment } =
    useAction(deleteAppointmentAction, {
      onSuccess: () => {
        toast.success("Agendamento cancelado com sucesso");
      },
      onError: (error) => {
        toast.error(error.error.serverError || "Erro ao cancelar agendamento");
      },
    });
  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleCancel = () => {
    deleteAppointment({ appointmentId: appointment.id });
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Ver detalhes</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Consulta</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Paciente:</span>
              <span className="col-span-3">{appointment.patient.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Email:</span>
              <span className="col-span-3">{appointment.patient.email}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Telefone:</span>
              <span className="col-span-3">
                {appointment.patient.phoneNumber}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Data:</span>
              <span className="col-span-3">
                {appointmentDate.format("DD [de] MMMM [de] YYYY")}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Horário:</span>
              <span className="col-span-3">
                {appointmentDate.format("HH:mm")}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Médico:</span>
              <span className="col-span-3">{appointment.doctor.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Especialidade:</span>
              <span className="col-span-3">{appointment.doctor.specialty}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Valor:</span>
              <span className="col-span-3 font-semibold text-green-600">
                {formatCurrencyInCents(
                  appointment.doctor.appointmentPriceInCents,
                )}
              </span>
            </div>
          </div>{" "}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Agendamento</DialogTitle>
          </DialogHeader>
          <EditAppointmentForm
            appointment={appointment}
            patients={patients}
            doctors={doctors}
            onSuccess={() => setIsEditDialogOpen(false)}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Mais ações</span>
          </Button>
        </DropdownMenuTrigger>{" "}
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Cancelar
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar Agendamento</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja cancelar este agendamento? Esta ação
                  não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não, manter</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancel}
                  disabled={isDeletingAppointment}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeletingAppointment ? "Cancelando..." : "Sim, cancelar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableActions;
