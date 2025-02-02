"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpView = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!email || !name) {
        alert("Invalid Input");

        return;
      }

      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        router.push("/signIn");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <label>
        <div className="font-satoshi font-semibold mb-2 text-base text-gray-700">
          Email
        </div>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@example.com"
          className="border border-gray-300 flex outline-0 p-3 rounded-lg text-gray-500 text-sm w-full focus:border-gray-500"
        />
      </label>
      <label>
        <div className="font-satoshi font-semibold mb-2 text-base text-gray-700">
          Name
        </div>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="John Doe"
          className="border border-gray-300 flex outline-0 p-3 rounded-lg text-gray-500 text-sm w-full focus:border-gray-500"
        />
      </label>
      <button
        type="button"
        className="bg-black border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-white transition-all rounded-full hover:bg-white hover:text-black"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUpView;
