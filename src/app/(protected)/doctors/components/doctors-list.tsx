"use client";

import { useState, useMemo } from "react";
import { doctorsTable } from "@/db/schema";
import SearchFilter from "@/components/ui/search-filter";
import DoctorCard from "./doctor-card";

interface DoctorsListProps {
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const DoctorsList = ({ doctors }: DoctorsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!searchTerm.trim()) return doctors;

    const searchLower = searchTerm.toLowerCase().trim();
    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchLower),
    );
  }, [doctors, searchTerm]);

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
        totalResults={doctors.length}
        filteredResults={filteredDoctors.length}
        placeholder="Buscar médico por nome..."
        entityName="médicos"
      />

      {filteredDoctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {searchTerm ? (
            <>
              <p className="text-muted-foreground text-lg font-medium">
                Nenhum médico encontrado
              </p>
              <p className="text-muted-foreground text-sm">
                Tente buscar com outro termo ou limpe o filtro
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-lg font-medium">
                Nenhum médico cadastrado
              </p>
              <p className="text-muted-foreground text-sm">
                Adicione seu primeiro médico para começar
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
