import { Migration } from '@mikro-orm/migrations';

export class Migration20250224020441 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" alter column "pokemon_id" type int using ("pokemon_id"::int);`);
    this.addSql(`alter table "pokemon_stat" alter column "pokemon_id" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon_stat" alter column "pokemon_id" type int using ("pokemon_id"::int);`);
    this.addSql(`alter table "pokemon_stat" alter column "pokemon_id" drop not null;`);
  }

}
