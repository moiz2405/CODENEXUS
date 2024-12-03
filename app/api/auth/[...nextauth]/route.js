import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      issuer: process.env.AUTH0_ISSUER || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Generate a strong secret for production
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Include the user ID in the session object
      return session;
    },
  },
});

export { handler as GET, handler as POST };
