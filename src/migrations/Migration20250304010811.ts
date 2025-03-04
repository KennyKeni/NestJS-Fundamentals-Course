import { Migration } from '@mikro-orm/migrations';

export class Migration20250304010811 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "permissions" text[] not null;`);
    this.addSql(`alter table "user" alter column "role" type "user_role" using ("role"::"user_role");`);
    this.addSql(`alter table "user" alter column "role" set default 'regular';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "permissions";`);

    this.addSql(`alter table "user" alter column "role" drop default;`);
    this.addSql(`alter table "user" alter column "role" type "user_role" using ("role"::"user_role");`);
  }

}
