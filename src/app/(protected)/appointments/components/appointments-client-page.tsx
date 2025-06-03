"use client";

import dayjs from "dayjs";
import { useMemo,useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import AppointmentsFilters from "./appointments-filters";
import { createColumns } from "./table-columns";

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect;
  doctor: typeof doctorsTable.$inferSelect;
};

interface AppointmentsClientPageProps {
  appointments: AppointmentWithRelations[];
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export function AppointmentsClientPage({
  appointments,
  patients,
  doctors,
}: AppointmentsClientPageProps) {
  const [filters, setFilters] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
  });

  const columns = useMemo(
    () => createColumns({ patients, doctors }),
    [patients, doctors],
  );

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      // Filtro de busca por texto
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesPatient = appointment.patient.name
          .toLowerCase()
          .includes(searchLower);
        const matchesDoctor = appointment.doctor.name
          .toLowerCase()
          .includes(searchLower);
        const matchesSpecialty = appointment.doctor.specialty
          .toLowerCase()
          .includes(searchLower);

        if (!matchesPatient && !matchesDoctor && !matchesSpecialty) {
          return false;
        }
      }

      // Filtro de data inicial
      if (filters.dateFrom) {
        const appointmentDate = dayjs(appointment.date);
        const filterDateFrom = dayjs(filters.dateFrom);
        if (appointmentDate.isBefore(filterDateFrom, "day")) {
          return false;
        }
      }

      // Filtro de data final
      if (filters.dateTo) {
        const appointmentDate = dayjs(appointment.date);
        const filterDateTo = dayjs(filters.dateTo);
        if (appointmentDate.isAfter(filterDateTo, "day")) {
          return false;
        }
      }

      return true;
    });
  }, [appointments, filters]);

  if (appointments.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <div className="text-muted-foreground mb-2 text-lg">
          Nenhuma consulta agendada
        </div>
        <div className="text-muted-foreground mb-4 text-sm">
          Comece agendando sua primeira consulta
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AppointmentsFilters onFilterChange={setFilters} />

      {filteredAppointments.length === 0 &&
      (filters.search || filters.dateFrom || filters.dateTo) ? (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <div className="text-muted-foreground mb-2 text-lg">
            Nenhuma consulta encontrada
          </div>
          <div className="text-muted-foreground mb-4 text-sm">
            Tente ajustar os filtros para ver mais resultados
          </div>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredAppointments} />
      )}
    </div>
  );
}

export default AppointmentsClientPage;
