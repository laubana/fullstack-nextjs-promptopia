"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Navigation = () => {
  const { data: session, status } = useSession();

  const [isVisible, setIsVisible] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between mb-16 pt-3 w-full">
      <Link href="/" className="flex gap-3 items-center justify-center">
        <Image
          src="/assets/images/logo.svg"
          width={36}
          height={36}
          className="object-contain"
          alt="logo"
        />
        <p className="font-satoshi font-semibold text-black text-lg tracking-wide max-sm:hidden">
          Promptopia
        </p>
      </Link>
      <div className="gap-3 hidden items-center justify-center sm:flex">
        {status !== "loading" && (
          <>
            {status === "authenticated" ? (
              <>
                <Link
                  href="/prompt/create"
                  className="bg-black border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-white transition-all rounded-full hover:bg-white hover:text-black"
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="bg-transparent border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-black transition-all rounded-full whitespace-nowrap hover:bg-black hover:text-white"
                >
                  Sign Out
                </button>
                <Link href={`/profile/${session.user.id}`}>
                  <Image
                    src={session.user.image}
                    width={32}
                    height={32}
                    className="object-contain rounded-full"
                    alt="profile"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signIn"
                  className="font-inter font-medium text-gray-700 text-lg hover:text-gray-500"
                >
                  Sign In
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="sm:hidden">
        {status !== "loading" && (
          <>
            {status === "authenticated" ? (
              <>
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  className="cursor-pointer object-contain rounded-full"
                  onClick={() => setIsVisible(true)}
                  alt="profile"
                />
                {isVisible && (
                  <div className="bg-white fixed flex flex-col gap-3 items-center justify-start left-0 p-5 right-0 shadow-2xl drop-shadow-2xl top-0 z-50">
                    <IoMdClose
                      size={32}
                      cursor="pointer"
                      className="self-end"
                      onClick={() => setIsVisible(false)}
                    />
                    <Link
                      href={`/profile/${session.user.id}`}
                      className="font-inter font-medium text-gray-700 text-lg hover:text-gray-500"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/prompt/create"
                      className="font-inter font-medium text-gray-700 text-lg hover:text-gray-500"
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="bg-transparent border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-lg text-black transition-all rounded-full whitespace-nowrap hover:bg-black hover:text-white"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <FaBars
                  size={24}
                  cursor="pointer"
                  onClick={() => setIsVisible(true)}
                />
                {isVisible && (
                  <div className="bg-white fixed flex flex-col gap-3 items-center justify-start left-0 p-5 right-0 shadow-2xl drop-shadow-2xl top-0 z-50">
                    <IoMdClose
                      size={32}
                      cursor="pointer"
                      className="self-end"
                      onClick={() => setIsVisible(false)}
                    />
                    <Link
                      href="/signIn"
                      className="font-inter font-medium text-gray-700 text-lg hover:text-gray-500"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
