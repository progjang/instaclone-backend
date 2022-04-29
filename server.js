import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    hello: Movie
  }
`;

const resolvers = {
  Query: {
    hello: () => ({ id: 1, title: "My best movie", year: 2022 }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is running on http://localhost:4000/"));
