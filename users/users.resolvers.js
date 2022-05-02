import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      return client.user.findUnique({
        where: { username },
      });
    },
  },
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        const oldUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        console.log(oldUser);
        if (oldUser) {
          throw new Error("username/email already exist");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            username,
            email,
            password: uglyPassword,
          },
        });
        return user;
      } catch (e) {
        return e;
      }
    },
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
