import { Migration } from '@mikro-orm/migrations';

export class Migration20250304003738 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create type "user_role" as enum ('regular', 'admin');`);
    this.addSql(`alter table "user" add column "role" "user_role" not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "role";`);

    this.addSql(`drop type "user_role";`);
  }

}
