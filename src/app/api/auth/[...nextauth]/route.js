import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { conn } from "@/libs/mysql";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        console.log("Usuario que intenta iniciar sesión:", user);

        // Verificar si el usuario ya existe
        const [existingUser] = await conn.query(
          "SELECT id FROM users WHERE email = ?",
          [user.email]
        );
        console.log("Usuario existente:", existingUser);

        if (!existingUser) {
          // Si no existe, insertar en la base de datos
          const result = await conn.query(
            `INSERT INTO users (name, email, image) VALUES (?, ?, ?)`,
            [user.name, user.email, user.image]
          );
          console.log("Usuario insertado:", result);
        }

        await conn.end();
        return true;
      } catch (error) {
        console.error("Error en signIn callback:", error);
        return false; // Bloquea el acceso en caso de error
      }
    },
    async session({ session }) {
      try {
        console.log("Sesión antes de modificar:", session);

        // Agregar el ID del usuario a la sesión
        const [dbUser] = await conn.query(
          "SELECT id FROM users WHERE email = ? LIMIT 1",
          [session.user.email]
        );
        console.log("Usuario en base de datos para la sesión:", dbUser);

        if (dbUser) {
          session.user.id = dbUser.id;
        }

        await conn.end();
        console.log("Sesión modificada:", session);
        return session;
      } catch (error) {
        console.error("Error en session callback:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
