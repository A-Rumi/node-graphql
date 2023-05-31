import 'reflect-metadata'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolver/user.resolver';
import { AppDataSource } from './config/orm-config';

const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver],
  });

const startServer = async () => {
  const schema = await createSchema();

  AppDataSource.initialize()
    .then(() => console.log('typeorm ready'))
    .catch((e:Error) => console.log('typeorm error', e));

  const server = new ApolloServer({
    schema,
  });

  const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
  });

  console.log(`🚀  Server ready at: ${url}`);

}

startServer()
