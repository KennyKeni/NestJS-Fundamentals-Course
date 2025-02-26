import { Migration } from '@mikro-orm/migrations';

export class Migration20250226041047 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" add column "slug" varchar(255) not null;`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_slug_unique" unique ("slug");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" drop constraint "pokemon_slug_unique";`);
    this.addSql(`alter table "pokemon" drop column "slug";`);
  }

}
