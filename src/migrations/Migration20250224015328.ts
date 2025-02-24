import { Migration } from '@mikro-orm/migrations';

export class Migration20250224015328 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "pokemon" ("pokemon_id" serial primary key, "name" varchar(255) not null, "image_url" varchar(255) null, "shiny_url" varchar(255) null, "generation" int not null, "description" varchar(255) null);`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_name_unique" unique ("name");`);

    this.addSql(`create table "pokemon_stat" ("pokemon_id" int null, "hp" int not null, "attack" int not null, "defense" int not null, "special_attack" int not null, "special_defense" int not null, "speed" int not null, constraint "pokemon_stat_pkey" primary key ("pokemon_id"));`);

    this.addSql(`create table "pokemon_type" ("type_id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemon" ("pokemon_id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_id_foreign";`);

    this.addSql(`drop table if exists "pokemon" cascade;`);

    this.addSql(`drop table if exists "pokemon_stat" cascade;`);

    this.addSql(`drop table if exists "pokemon_type" cascade;`);
  }

}
