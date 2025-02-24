import { Migration } from '@mikro-orm/migrations';

export class Migration20250224174117 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "effectiveness" ("attacking_type_type_id" int not null, "defending_type_type_id" int not null, "multiplier" numeric(5,2) not null, constraint "effectiveness_pkey" primary key ("attacking_type_type_id", "defending_type_type_id"));`);

    this.addSql(`alter table "effectiveness" add constraint "effectiveness_attacking_type_type_id_foreign" foreign key ("attacking_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_defending_type_type_id_foreign" foreign key ("defending_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);

    this.addSql(`alter table "pokemon" add column "implemented" boolean not null default false;`);

    this.addSql(`alter table "pokemon_type" add constraint "pokemon_type_name_unique" unique ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "effectiveness" cascade;`);

    this.addSql(`alter table "pokemon" drop column "implemented";`);

    this.addSql(`alter table "pokemon_type" drop constraint "pokemon_type_name_unique";`);
  }

}
