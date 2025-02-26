import { Migration } from '@mikro-orm/migrations';

export class Migration20250226041809 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_uuid_foreign";`);

    this.addSql(`alter table "pokemon" drop constraint "pokemon_pkey";`);

    this.addSql(`alter table "pokemon" rename column "uuisdsadd" to "uuid";`);
    this.addSql(`alter table "pokemon" rename column "nationald_dex" to "national_dex";`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_pkey" primary key ("uuid");`);

    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_uuid_foreign" foreign key ("uuid") references "pokemon" ("uuid") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_uuid_foreign";`);

    this.addSql(`alter table "pokemon" drop constraint "pokemon_pkey";`);

    this.addSql(`alter table "pokemon" rename column "uuid" to "uuisdsadd";`);
    this.addSql(`alter table "pokemon" rename column "national_dex" to "nationald_dex";`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_pkey" primary key ("uuisdsadd");`);

    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_uuid_foreign" foreign key ("uuid") references "pokemon" ("uuisdsadd") on update cascade on delete cascade;`);
  }

}
