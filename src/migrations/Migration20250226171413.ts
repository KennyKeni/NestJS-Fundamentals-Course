import { Migration } from '@mikro-orm/migrations';

export class Migration20250226171413 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_attacking_type_type_id_foreign";`);
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_defending_type_type_id_foreign";`);

    this.addSql(`alter table "pokemon_type" drop constraint "pokemon_type_pkey";`);

    this.addSql(`alter table "pokemon_type" rename column "type_id" to "id";`);
    this.addSql(`alter table "pokemon_type" add constraint "pokemon_type_pkey" primary key ("id");`);

    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_pkey";`);
    this.addSql(`alter table "effectiveness" drop column "attacking_type_type_id", drop column "defending_type_type_id";`);

    this.addSql(`alter table "effectiveness" add column "attacking_type_id" varchar(255) not null, add column "defending_type_id" varchar(255) not null;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_attacking_type_id_foreign" foreign key ("attacking_type_id") references "pokemon_type" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_defending_type_id_foreign" foreign key ("defending_type_id") references "pokemon_type" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_pkey" primary key ("attacking_type_id", "defending_type_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_attacking_type_id_foreign";`);
    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_defending_type_id_foreign";`);

    this.addSql(`alter table "pokemon_type" drop constraint "pokemon_type_pkey";`);

    this.addSql(`alter table "pokemon_type" rename column "id" to "type_id";`);
    this.addSql(`alter table "pokemon_type" add constraint "pokemon_type_pkey" primary key ("type_id");`);

    this.addSql(`alter table "effectiveness" drop constraint "effectiveness_pkey";`);
    this.addSql(`alter table "effectiveness" drop column "attacking_type_id", drop column "defending_type_id";`);

    this.addSql(`alter table "effectiveness" add column "attacking_type_type_id" varchar(255) not null, add column "defending_type_type_id" varchar(255) not null;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_attacking_type_type_id_foreign" foreign key ("attacking_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_defending_type_type_id_foreign" foreign key ("defending_type_type_id") references "pokemon_type" ("type_id") on update cascade on delete cascade;`);
    this.addSql(`alter table "effectiveness" add constraint "effectiveness_pkey" primary key ("attacking_type_type_id", "defending_type_type_id");`);
  }

}
