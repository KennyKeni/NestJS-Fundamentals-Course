import { Migration } from '@mikro-orm/migrations';

export class Migration20250225002416 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "pokemon" rename column "source" to "sourcd";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pokemon" rename column "sourcd" to "source";`);
  }

}
