"use client";

import React from "react";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";

type pageProps = { params: { id: string } };

const YourProfile: React.FC<pageProps> = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setUsername(data[0].creator.username);
      setPosts(data);
    };
    if (params.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username} profile`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};
export default YourProfile;
