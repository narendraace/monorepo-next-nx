import React from "react";
import Link from "next/link";

type FormProps = {
  type: string;
  post: { prompt: string; tag: string };
  setPost: any;
  submitting: boolean;
  handleSubmit: any;
};

const Form: React.FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="flex-start max-w-full flex-col w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Post</span>
      </h1>
      <p className="desc text-left max-w-md">{type} a prompt to get started</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4 ">
          <Link href="/">Cancel</Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
