import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): LoginResult!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
