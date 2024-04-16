import { Session } from "next-auth";

export interface Sessions extends Session {
  user?: {
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export type Post = {
  _id: string;
  prompt: string;
  tag: string;
  creator: { image: string; email: string; username: string; _id: string };
};
