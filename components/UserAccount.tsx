"use client";

import { User } from "next-auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

const UserAccount = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* user avatar */}
        <UserAvatar user={user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className=" font-medium">{user.name}</p>}

            {user.email && (
              <p className=" w-[230px] truncate text-sm text-zinc-400">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">Meow</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className=" text-red-600 cursor-pointer gap-3"
        >
          Sign-out
          <LogOut size={20} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
