"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between mb-16 pt-3 w-full">
      <Link href="/" className="flex gap-2 items-start justify-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
    </nav>
  );
};

export default Navigation;
