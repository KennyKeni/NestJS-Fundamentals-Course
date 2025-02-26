import { Migration } from '@mikro-orm/migrations';

export class Migration20250226031952 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_uuid_foreign";`);

    this.addSql(`alter table "pokemon" drop constraint "pokemon_pkey";`);

    this.addSql(`alter table "pokemon" rename column "pokemon_uuid" to "uuid";`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_pkey" primary key ("uuid");`);

    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_uuid_foreign" foreign key ("pokemon_uuid") references "pokemon" ("uuid") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" drop constraint "pokemon_stat_pokemon_uuid_foreign";`);

    this.addSql(`alter table "pokemon" drop constraint "pokemon_pkey";`);

    this.addSql(`alter table "pokemon" rename column "uuid" to "pokemon_uuid";`);
    this.addSql(`alter table "pokemon" add constraint "pokemon_pkey" primary key ("pokemon_uuid");`);

    this.addSql(`alter table "pokemon_stat" add constraint "pokemon_stat_pokemon_uuid_foreign" foreign key ("pokemon_uuid") references "pokemon" ("pokemon_uuid") on update cascade on delete cascade;`);
  }

}
