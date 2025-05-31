"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrencyInCents } from "@/helpers/currency";
import { Calendar, DollarSign, Stethoscope, Users } from "lucide-react";

interface DashboardMetricsProps {
  totalRevenue: number;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
}

export function DashboardMetrics({
  totalRevenue,
  totalAppointments,
  totalPatients,
  totalDoctors,
}: DashboardMetricsProps) {
  const metrics = [
    {
      title: "Faturamento",
      value: formatCurrencyInCents(totalRevenue),
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Agendamentos",
      value: totalAppointments.toString(),
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Pacientes",
      value: totalPatients.toString(),
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Médicos",
      value: totalDoctors.toString(),
      icon: Stethoscope,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
