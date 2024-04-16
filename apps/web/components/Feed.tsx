"use client";

import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@utils/types";

type FeedProps = {};
type PromptListProps = {
  data: any[];
  handleTagClick: (tag: string) => void;
};
const PromptCardList: React.FC<PromptListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed: React.FC<FeedProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchText(e.target.value);
    console.log(search);
    let filteredPosts: any;
    if (searchText[0] !== "#") {
      filteredPosts = allPosts.filter((post: Post) =>
        post.prompt.toLowerCase().includes(search)
      );
    } else {
      filteredPosts = allPosts.filter((post: Post) =>
        post.tag.toLowerCase().includes(search)
      );
    }
    setPosts(filteredPosts);
  };
  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    let filteredPosts;
    filteredPosts = allPosts.filter((post: Post) =>
      post.tag.toLowerCase().includes(tag)
    );
    setPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setAllPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt"
          value={searchText ?? ""}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
