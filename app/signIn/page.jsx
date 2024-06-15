"use client";

import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const SignInView = () => {
  const [providers, setProviders] = useState([]);
  const [email, setEmail] = useState("");

  const handleOAuthSignIn = async (providerId) => {
    await signIn(providerId, { callbackUrl: "/" });
  };

  const handleCredentialsSignIn = async (providerId) => {
    if (email) {
      await signIn(providerId, { email, callbackUrl: "/" });
    }
  };

  useEffect(() => {
    const main = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    main();
  }, []);

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
      {Object.values(providers).map((provider, index) =>
        provider.type === "oauth" ? (
          <button
            type="button"
            onClick={() => handleOAuthSignIn(provider.id)}
            className="bg-black border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-white transition-all rounded-full hover:bg-white hover:text-black"
            key={index}
          >
            Sign In with {provider.name.replace("Credentials", "Email")}
          </button>
        ) : (
          <button
            test={`button-${index}`}
            type="button"
            onClick={() => handleCredentialsSignIn(provider.id)}
            className="bg-black border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-white transition-all rounded-full hover:bg-white hover:text-black"
            key={index}
          >
            Sign In with {provider.name.replace("Credentials", "Email")}
          </button>
        )
      )}
    </div>
  );
};

export default SignInView;
