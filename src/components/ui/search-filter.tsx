"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearFilter: () => void;
  totalResults: number;
  filteredResults: number;
  placeholder?: string;
  entityName: string; // "pacientes" ou "médicos"
}

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  onClearFilter,
  totalResults,
  filteredResults,
  placeholder = "Buscar por nome...",
  entityName,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        {searchTerm && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClearFilter}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="text-muted-foreground text-sm">
        {searchTerm ? (
          <>
            {filteredResults} de {totalResults} {entityName} encontrados
          </>
        ) : (
          <>
            {totalResults} {entityName} cadastrados
          </>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
