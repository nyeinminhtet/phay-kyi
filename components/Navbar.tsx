import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import UserAccount from "./UserAccount";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <div className=" fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-10 h-fit border-b border-zinc-300 py-2">
      <div className=" flex justify-between items-center gap-2 h-full mx-auto max-w-7xl px-8">
        {/* logo */}
        <Link href="/" className=" flex items-center gap-2">
          <p
            className=" rounded-lg border-b-4 border-r-4 border-gray-600 px-2 py-1 text-xl font-bold transition-all
                   hover:-translate-y-[2px] md:block dark:border-white"
          >
            Phay Kyi
          </p>
        </Link>

        <div className="flex items-center">
          <ThemeToggle className=" mr-5" />
          <div className=" flex items-center">
            {session?.user ? (
              <UserAccount user={session.user} />
            ) : (
              <SignInButton text="Sign-in" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
