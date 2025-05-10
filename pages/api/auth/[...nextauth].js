import NextAuth from "next-auth";
import connectMongoDB from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import Wallet from "@/models/wallet";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        await connectMongoDB();
        
        let existingUser = await User.findOne({
          email: credentials.email,
          password: credentials.password,
        });
console.log('existingUser =====>',existingUser)
        if (!existingUser && credentials.type === "CreateUser") {
          if (!credentials.referralCode) {
            throw new Error("Referral code is required to create an account.");
          }
       
          await existingUser.save();

          return existingUser;
        } else if (credentials.type === "loginUser" && existingUser) {
          return existingUser;
        } else {
          throw new Error("Invalid credentials or user not found.");
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectMongoDB();
        let existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          user.id = existingUser._id.toString();
          user.name = existingUser.name;
          user.email = existingUser.email;
          user.image = existingUser.image || "";
          return true; // Allow sign-in
        } else {
          return Promise.reject(
            new Error("User not found. Please sign up first.")
          );

          // return false;  // Prevent sign-in if user is not found
        }
      } catch (e) {
        console.log("Error during sign-in:", e);
        return false; // Return false on error to prevent login
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.image;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/login",
    verifyRequest: "/",
  },
};

export default NextAuth(authOptions);
