import "reflect-metadata"
import { DataSource } from "typeorm"
import { People } from './src/model/people';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "rumi",
  password: "1017",
  database: "test",
  entities: [People],
  synchronize: true,
  logging: false,
})
