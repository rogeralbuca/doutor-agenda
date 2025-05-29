"use client";

import { getNameInitials } from "@/helpers/name-initials-helper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserAvatar({ userName }: { userName: string }) {
  const initials = getNameInitials(userName);

  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
