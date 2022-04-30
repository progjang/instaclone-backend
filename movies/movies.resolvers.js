import client from "../client";

export default {
  Query: {
    hello: () => ({ id: 1, title: "My best movie", year: 2022 }),
  },

  Mutation: {
    createMovie: (_, { title, year }) =>
      client.movie.create({ data: { title, year } }),
  },
};
