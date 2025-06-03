"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/helpers/name-initials-helper";

export function UserAvatar({ userName }: { userName: string }) {
  const initials = getNameInitials(userName);

  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
