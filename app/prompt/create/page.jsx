"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Protect from "@components/Protect";
import Form from "@components/Form";

const PromptCreateView = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ prompt: "", category: "" });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!form.prompt || !form.category) {
        alert("Invalid Input");

        return;
      }

      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({ ...form, userId: session?.user.id }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Protect>
      <Form
        type="create"
        form={form}
        setForm={setForm}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </Protect>
  );
};

export default PromptCreateView;
