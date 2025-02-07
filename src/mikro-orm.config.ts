import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
  
export default defineConfig({
  host: 'localhost',
  port: 5432,
  user: 'keni',
  password: 'pass123',
  dbName: 'iluvcoffee',
  entities: [
    'dist/**/*.entity.js',
    'dist/common/entities/*.entity.js',
  ],
  entitiesTs: [
    'src/**/*.entity.ts',
    'src/common/entities/*.entity.js',
  ],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager],
})