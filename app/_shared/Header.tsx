"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4 shadow-[0_6px_8px_rgba(255,165,0,0.25)]">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        <h2 className="text-xl font-semibold">
          <span className="text-primary">UXUI</span> MOCK
        </h2>
      </div>
      <ul className="flex gap-5 items-center text-lg font-semibold">
        <li className="hover:text-primary cursor-pointer">Home</li>
        <li className="hover:text-primary cursor-pointer">Pricing</li>
      </ul>
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <UserButton />
      )}
    </div>
  );
};

export default Header;
