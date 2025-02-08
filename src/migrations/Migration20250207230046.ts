import { Migration } from '@mikro-orm/migrations';

export class Migration20250207230046 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "pokemon" ("pokemon_id" serial primary key, "name" varchar(255) not null, "image_url" varchar(255) null, "shiny_url" varchar(255) null, "generation" int not null, "description" varchar(255) null);`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_name_unique" unique ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "pokemon" cascade;`);
  }

}
