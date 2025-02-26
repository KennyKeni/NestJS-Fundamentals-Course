import { Migration } from '@mikro-orm/migrations';

export class Migration20250226041749 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" rename column "national_dex" to "nationald_dex";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" rename column "nationald_dex" to "national_dex";`);
  }

}
