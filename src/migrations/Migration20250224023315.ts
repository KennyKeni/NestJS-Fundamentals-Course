import { Migration } from '@mikro-orm/migrations';

export class Migration20250224023315 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_id_foreign";`);

    this.addSql(`alter table "pokemon" drop constraint "pokemon_pkey";`);
    this.addSql(`alter table "pokemon" drop column "pokemon_id";`);

    this.addSql(`alter table "pokemon" add column "pokemon_uuid" varchar(255) not null;`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_pkey" primary key ("pokemon_uuid");`);

    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pkey";`);
    this.addSql(`alter table "pokemon_stat" drop column "pokemon_id";`);

    this.addSql(`alter table "pokemon_stat" add column "pokemon_uuid" varchar(255) not null;`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_uuid_foreign" foreign key ("pokemon_uuid") references "pokemon" ("pokemon_uuid") on update cascade on delete cascade;`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pkey" primary key ("pokemon_uuid");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_uuid_foreign";`);

    this.addSql(`alter table "pokemon" drop constraint "pokemon_pkey";`);
    this.addSql(`alter table "pokemon" drop column "pokemon_uuid";`);

    this.addSql(`alter table "pokemon" add column "pokemon_id" serial;`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_pkey" primary key ("pokemon_id");`);

    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pkey";`);
    this.addSql(`alter table "pokemon_stat" drop column "pokemon_uuid";`);

    this.addSql(`alter table "pokemon_stat" add column "pokemon_id" int not null;`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemon" ("pokemon_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pkey" primary key ("pokemon_id");`);
  }

}
