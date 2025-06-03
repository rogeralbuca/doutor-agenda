"use client";

import { useMemo,useState } from "react";

import SearchFilter from "@/components/ui/search-filter";
import { patientsTable } from "@/db/schema";

import PatientCard from "./patient-card";

interface PatientsListProps {
  patients: (typeof patientsTable.$inferSelect)[];
}

const PatientsList = ({ patients }: PatientsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;

    const searchLower = searchTerm.toLowerCase().trim();
    return patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchLower),
    );
  }, [patients, searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearFilter={handleClearFilter}
        totalResults={patients.length}
        filteredResults={filteredPatients.length}
        placeholder="Buscar paciente por nome..."
        entityName="pacientes"
      />

      {filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {searchTerm ? (
            <>
              <p className="text-muted-foreground text-lg font-medium">
                Nenhum paciente encontrado
              </p>
              <p className="text-muted-foreground text-sm">
                Tente buscar com outro termo ou limpe o filtro
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-lg font-medium">
                Nenhum paciente cadastrado
              </p>
              <p className="text-muted-foreground text-sm">
                Adicione seu primeiro paciente para começar
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsList;
