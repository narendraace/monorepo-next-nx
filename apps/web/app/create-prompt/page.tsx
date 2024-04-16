"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sessions } from "@utils/types";
import Form from "@components/Form";

type pageProps = {};

const CreatePrompt: React.FC<pageProps> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  const sessions = session as Sessions;
  const createPrompt = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (sessions?.user) {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            userId: sessions?.user.id,
            tag: post.tag,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};
export default CreatePrompt;
