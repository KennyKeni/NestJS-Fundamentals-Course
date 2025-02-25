import { Migration } from '@mikro-orm/migrations';

export class Migration20250225000018 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create type "entity_source" as enum ('pokemon', 'minecraft', 'cobblemon', 'cobblemon_delta', 'unknown');`);
    this.addSql(`alter table "pokemon" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null, add column "source" "entity_source" not null default 'unknown';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" drop column "created_at", drop column "updated_at", drop column "source";`);

    this.addSql(`drop type "entity_source";`);
  }

}
