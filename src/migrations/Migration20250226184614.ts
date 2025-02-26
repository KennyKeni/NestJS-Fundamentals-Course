import { Migration } from '@mikro-orm/migrations';

export class Migration20250226184614 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create type "entity_source" as enum ('pokemon', 'minecraft', 'cobblemon', 'cobblemon_delta', 'unknown');`);
    this.addSql(`create table "pokemon" ("uuid" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "implemented" boolean not null default false, "source" "entity_source" not null default 'unknown', "national_dex" int not null, "name" varchar(255) not null, "slug" varchar(255) not null, "generation" int not null, "description" text null, "image_url" varchar(255) null, "shiny_url" varchar(255) null, constraint "pokemon_pkey" primary key ("uuid"));`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_name_unique" unique ("name");`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_slug_unique" unique ("slug");`);

    this.addSql(`create table "pokemon_stat" ("pokemon_uuid" uuid not null, "hp" int not null, "attack" int not null, "defense" int not null, "special_attack" int not null, "special_defense" int not null, "speed" int not null, constraint "pokemon_stat_pkey" primary key ("pokemon_uuid"));`);

    this.addSql(`create table "pokemon_type" ("id" serial primary key, "name" varchar(255) not null);`);
    this.addSql(`alter table "pokemon_type" add constraint "pokemon_type_name_unique" unique ("name");`);

    this.addSql(`create table "effectiveness" ("attacking_type_id" smallint not null, "defending_type_id" smallint not null, "multiplier" decimal(5,2) CHECK (multiplier IN (0, 0.5, 1.0, 2.0)) not null, constraint "effectiveness_pkey" primary key ("attacking_type_id", "defending_type_id"));`);

    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_uuid_foreign" foreign key ("pokemon_uuid") references "pokemon" ("uuid") on update cascade on delete cascade;`);

    this.addSql(`alter table "effectiveness" add constraint "effectiveness_attacking_type_id_foreign" foreign key ("attacking_type_id") references "pokemon_type" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_defending_type_id_foreign" foreign key ("defending_type_id") references "pokemon_type" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_uuid_foreign";`);

    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_attacking_type_id_foreign";`);

    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_defending_type_id_foreign";`);

    this.addSql(`drop table if exists "pokemon" cascade;`);

    this.addSql(`drop table if exists "pokemon_stat" cascade;`);

    this.addSql(`drop table if exists "pokemon_type" cascade;`);

    this.addSql(`drop table if exists "effectiveness" cascade;`);

    this.addSql(`drop type "entity_source";`);
  }

}
