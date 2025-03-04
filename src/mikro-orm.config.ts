import { defineConfig, PostgreSqlDriver, ReflectMetadataProvider } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || "54320"),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: [
    'dist/**/entities/*.entity.js',
  ],
  entitiesTs: [
    'src/**/entities/*.entity.ts',
  ],
  debug: true,
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
  loadStrategy: 'joined',
})