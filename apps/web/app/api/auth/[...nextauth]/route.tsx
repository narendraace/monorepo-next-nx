import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { Sessions } from "@utils/types";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

// type Profile = {
//   email: string;
//   name: string;
//   picture: string;
// };
const GoogleId = process.env.GOOGLE_ID || "none";
const GoogleSecret = process.env.GOOGLE_CLIENT_SECRET || "none";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GoogleId,
      clientSecret: GoogleSecret,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Sessions }) {
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });

        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
