import { Migration } from '@mikro-orm/migrations';

export class Migration20250226041551 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_uuid_foreign";`);

    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pkey";`);

    this.addSql(`alter table "pokemon_stat" rename column "pokemon_uuid" to "uuid";`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_uuid_foreign" foreign key ("uuid") references "pokemon" ("uuid") on update cascade on delete cascade;`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pkey" primary key ("uuid");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_uuid_foreign";`);

    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pkey";`);

    this.addSql(`alter table "pokemon_stat" rename column "uuid" to "pokemon_uuid";`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_uuid_foreign" foreign key ("pokemon_uuid") references "pokemon" ("uuid") on update cascade on delete cascade;`);
    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pkey" primary key ("pokemon_uuid");`);
  }

}
