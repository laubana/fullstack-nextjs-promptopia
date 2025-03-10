"use client";

import { useEffect, useState } from "react";

import Feed from "@components/Feed";

const HomeView = () => {
  const [prompts, setPrompts] = useState(undefined);

  useEffect(() => {
    const main = async () => {
      const response = await fetch("/api/prompts", { method: "GET" });
      const data = (await response.json()).data;

      setPrompts(data);
    };

    main();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <h1 className="font-extrabold leading-tight mt-5 text-5xl text-black text-center sm:text-6xl">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="bg-clip-text bg-gradient-to-r from-amber-500 text-center text-transparent to-yellow-500 via-orange-600">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="max-w-2xl mt-5 text-center text-gray-600 text-lg sm:text-xl">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed prompts={prompts} />
    </section>
  );
};

export default HomeView;
