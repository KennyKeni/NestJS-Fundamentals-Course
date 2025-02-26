import { defineConfig, PostgreSqlDriver, ReflectMetadataProvider } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 54320,
  user: 'keni',
  password: 'pass123',
  dbName: 'iluvcoffee',
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