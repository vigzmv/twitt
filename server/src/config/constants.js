export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://root:dev@ds213199.mlab.com:13199/twitt',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'secretforjwt',
};
