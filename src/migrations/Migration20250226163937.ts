import { Migration } from '@mikro-orm/migrations';

export class Migration20250226163937 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_attacking_type_type_id_foreign";`);
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_defending_type_type_id_foreign";`);

    this.addSql(`alter table "pokemon_type" alter column "type_id" type varchar(255) using ("type_id"::varchar(255));`);

    this.addSql(`alter table "effectiveness" alter column "attacking_type_type_id" type varchar(255) using ("attacking_type_type_id"::varchar(255));`);
    this.addSql(`alter table "effectiveness" alter column "defending_type_type_id" type varchar(255) using ("defending_type_type_id"::varchar(255));`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_attacking_type_type_id_foreign" foreign key ("attacking_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_defending_type_type_id_foreign" foreign key ("defending_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_attacking_type_type_id_foreign";`);
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_defending_type_type_id_foreign";`);

    this.addSql(`alter table "pokemon_type" alter column "type_id" type int using ("type_id"::int);`);

    this.addSql(`alter table "effectiveness" alter column "attacking_type_type_id" type int using ("attacking_type_type_id"::int);`);
    this.addSql(`alter table "effectiveness" alter column "defending_type_type_id" type int using ("defending_type_type_id"::int);`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_attacking_type_type_id_foreign" foreign key ("attacking_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_defending_type_type_id_foreign" foreign key ("defending_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
  }

}
