"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Sessions, Post } from "@utils/types";
import Profile from "@components/Profile";

type pageProps = {};

const MyProfile: React.FC<pageProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const sessions = session as Sessions;
  useEffect(() => {
    const fetchPosts = async () => {
      if (sessions.user) {
        const response = await fetch(`/api/users/${sessions?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
      }
    };
    if (sessions.user) {
      if (sessions?.user.id) fetchPosts();
    }
  }, []);
  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p: Post) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default MyProfile;
