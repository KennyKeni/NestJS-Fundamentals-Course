import { Migration } from '@mikro-orm/migrations';

export class Migration20250228004205 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" alter column "generation" type smallint using ("generation"::smallint);`);
    this.addSql(`alter table "pokemon" add constraint pokemon_generation_check check(generation >= 0 AND generation <= 10);`);

    this.addSql(`alter table "pokemon_typing" add constraint "pokemon_typing_slot_unique" unique ("slot");`);
    this.addSql(`alter table "pokemon_typing" add constraint pokemon_typing_slot_check check(slot BETWEEN 0 AND 1);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" drop constraint pokemon_generation_check;`);

    this.addSql(`alter table "pokemon" alter column "generation" type int using ("generation"::int);`);

    this.addSql(`alter table "pokemon_typing" drop constraint "pokemon_typing_slot_unique";`);
    this.addSql(`alter table "pokemon_typing" drop constraint pokemon_typing_slot_check;`);
  }

}
