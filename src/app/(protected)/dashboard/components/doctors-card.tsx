"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { Stethoscope } from "lucide-react";
import { UserAvatar } from "../../components/user-avatar";

interface DoctorsCardProps {
  doctors: (typeof doctorsTable.$inferSelect & {
    appointmentCount: number;
  })[];
}

export function DoctorsCard({ doctors }: DoctorsCardProps) {
  const topDoctors = doctors
    .sort((a, b) => b.appointmentCount - a.appointmentCount)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Médicos
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topDoctors.map((doctor, index) => (
          <div key={doctor.id}>
            <div className="flex items-center gap-3">
              <UserAvatar userName={doctor.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{doctor.name}</p>
                <p className="text-muted-foreground text-xs">
                  {doctor.specialty}
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {doctor.appointmentCount} agend.
              </Badge>
            </div>
            {index < topDoctors.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
