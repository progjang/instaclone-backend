import { gql } from "apollo-server";

export default gql`
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
  type Mutation {
    createMovie(title: String, year: Int): Movie
  }
`;
