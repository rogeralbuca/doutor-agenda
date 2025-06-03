"use client";

import { Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface SpecialtiesCardProps {
  specialties: {
    name: string;
    count: number;
    percentage: number;
  }[];
}

export function SpecialtiesCard({ specialties }: SpecialtiesCardProps) {
  const topSpecialties = specialties
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Especialidades
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topSpecialties.map((specialty, index) => (
          <div key={specialty.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{specialty.name}</span>
              <span className="text-sm text-muted-foreground">
                {specialty.count} agend.
              </span>
            </div>
            <Progress value={specialty.percentage} className="h-2" />
            {index < topSpecialties.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
