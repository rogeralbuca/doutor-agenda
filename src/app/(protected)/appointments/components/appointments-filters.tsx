"use client";

import { Calendar, Search, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppointmentsFiltersProps {
  onFilterChange: (filters: {
    search: string;
    dateFrom: string;
    dateTo: string;
  }) => void;
}

export function AppointmentsFilters({
  onFilterChange,
}: AppointmentsFiltersProps) {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({
      search: value,
      dateFrom: dateFrom || "",
      dateTo: dateTo || "",
    });
  };

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    onFilterChange({ search, dateFrom: value, dateTo: dateTo || "" });
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    onFilterChange({ search, dateFrom: dateFrom || "", dateTo: value });
  };
  const clearFilters = () => {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    onFilterChange({ search: "", dateFrom: "", dateTo: "" });
  };

  const hasActiveFilters = search || dateFrom || dateTo;

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Buscar por paciente ou médico..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="date"
              placeholder="Data inicial"
              value={dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
              className="w-40 pl-9"
            />
          </div>

          <div className="relative">
            <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="date"
              placeholder="Data final"
              value={dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
              className="w-40 pl-9"
            />
          </div>

          {hasActiveFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export default AppointmentsFilters;
