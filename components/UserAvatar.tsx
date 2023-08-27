import { User } from "next-auth";
import React from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";

type Props = {
  user: Pick<User, "name" | "image">;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <div className=" w-full h-full relative aspect-square">
          <Image
            src={user.image}
            alt="profile"
            fill
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <div className=" sr-only">{user.name}</div>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
