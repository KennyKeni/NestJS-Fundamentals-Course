import { Migration } from '@mikro-orm/migrations';

export class Migration20250225003513 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" alter column "source" type "entity_source" using ("source"::"entity_source");`);
    this.addSql(`alter table "pokemon" alter column "source" set default 'unknown';`);
    this.addSql(`alter table "pokemon" alter column "source" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" alter column "source" drop default;`);
    this.addSql(`alter table "pokemon" alter column "source" type "entity_source" using ("source"::"entity_source");`);
    this.addSql(`alter table "pokemon" alter column "source" drop not null;`);
  }

}
