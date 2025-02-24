import { Migration } from '@mikro-orm/migrations';

export class Migration20250224030452 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" add column "national_dex" int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" drop column "national_dex";`);
  }

}
