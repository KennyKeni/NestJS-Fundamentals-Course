import { Migration } from '@mikro-orm/migrations';

export class Migration20250225002751 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" rename column "sourcd" to "source";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" rename column "source" to "sourcd";`);
  }

}
