"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { formatCurrencyInCents } from "@/helpers/currency";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import TableActions from "./table-actions";

dayjs.locale("pt-br");

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

interface ColumnsProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export const createColumns = ({ patients, doctors }: ColumnsProps): ColumnDef<AppointmentWithRelations>[] => [
  {
    accessorKey: "patient.name",
    header: "Paciente",
    cell: ({ row }) => {
      return <div>{row.original.patient.name}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const date = dayjs(row.getValue("date"));
      return <div>{date.format("DD/MM/YYYY [às] HH:mm")}</div>;
    },
  },
  {
    accessorKey: "doctor.name",
    header: "Médico",
    cell: ({ row }) => {
      return <div>{row.original.doctor.name}</div>;
    },
  },
  {
    accessorKey: "doctor.specialty",
    header: "Especialidade",
    cell: ({ row }) => {
      return <div>{row.original.doctor.specialty}</div>;
    },
  },
  {
    accessorKey: "doctor.appointmentPriceInCents",
    header: "Valor",
    cell: ({ row }) => {
      const priceInCents = row.original.doctor.appointmentPriceInCents;
      return (
        <div className="text-green-600">
          {formatCurrencyInCents(priceInCents)}
        </div>
      );
    },
  },  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <TableActions appointment={row.original} patients={patients} doctors={doctors} />;
    },
  },
];
