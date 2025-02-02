import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { connect } from "@configs/db";
import User from "@models/_User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      authorize: async (credentials) => {
        return credentials;
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const user = await User.findOne({ email: session.user.email });

      session.user.id = user.id;
      session.user.email = user.email;
      session.user.name = user.name;
      session.user.image = user.imageUrl;

      return session;
    },
    signIn: async ({ account, profile, credentials }) => {
      try {
        await connect();

        const user = await User.findOne({
          email: profile?.email || credentials?.email,
        }).lean();

        if (user) {
          return true;
        } else {
          if (account.type === "oauth") {
            await User.create({
              email: profile.email,
              name: profile.name,
              imageUrl: profile.picture,
            });

            return true;
          } else {
            return "/";
          }
        }
      } catch (error) {
        console.error(error);

        return "/";
      }
    },
  },
};

export default NextAuth(authOptions);
