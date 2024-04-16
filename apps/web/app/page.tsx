import React from "react";
import Feed from "@components/Feed";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-center head_text">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">Promptia is an open source tool</p>
      <Feed />
    </section>
  );
};
export default Home;
