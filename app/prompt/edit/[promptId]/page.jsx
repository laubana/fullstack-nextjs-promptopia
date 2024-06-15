"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "@components/Form";
import Protect from "@components/Protect";

const PromptEditView = ({ params }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ prompt: "", category: "" });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt", {
        method: "PUT",
        body: JSON.stringify({
          promptId: params.promptId,
          prompt: form.prompt,
          category: form.category,
        }),
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

  useEffect(() => {
    const main = async () => {
      const response = await fetch(`/api/prompt/${params.promptId}`, {
        method: "GET",
      });
      const data = (await response.json()).data;

      if (data) {
        setForm({ prompt: data.prompt, category: data.category });
        setIsLoading(false);
      }
    };

    main();
  }, []);

  return (
    <Protect>
      <Form
        type="edit"
        form={form}
        setForm={setForm}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </Protect>
  );
};

export default PromptEditView;
