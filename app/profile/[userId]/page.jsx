"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import Feed from "@components/Feed";

const ProfileView = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState();
  const [prompts, setPrompts] = useState();

  const handleEdit = async (promptId) => {
    router.push(`/prompt/edit/${promptId}`);
  };

  const handleDelete = async (promptId) => {
    try {
      const response = await fetch("/api/prompt", {
        method: "DELETE",
        body: JSON.stringify({ promptId }),
      });

      if (response.ok) {
        setPrompts((oldValues) =>
          oldValues.filter((oldValue) => oldValue._id !== promptId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const main = async () => {
      const response = await fetch(`/api/user/${params.userId}`, {
        method: "GET",
      });
      const data = (await response.json()).data;

      if (data) {
        setUser(data);
      }
    };

    main();
  }, []);

  useEffect(() => {
    const main = async () => {
      const response = await fetch("/api/prompts", { method: "GET" });
      const data = (await response.json()).data;

      setPrompts(data.filter((prompt) => prompt.user._id === params.userId));
    };

    main();
  }, []);

  return (
    <>
      {user && (
        <>
          <Profile email={user.email} />
          {status === "authenticated" && session.user.id === params.userId ? (
            <Feed
              prompts={prompts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              owned
            />
          ) : (
            <Feed prompts={prompts} />
          )}
        </>
      )}
    </>
  );
};

export default ProfileView;
