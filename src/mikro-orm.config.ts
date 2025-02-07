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
    'dist/**/*.entity.js',
    'dist/common/entities/*.entity.js',
  ],
  entitiesTs: [
    'src/**/*.entity.ts',
    'src/common/entities/*.entity.ts',
  ],
  debug: true,
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
})