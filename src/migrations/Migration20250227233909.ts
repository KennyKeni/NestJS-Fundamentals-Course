import { Migration } from '@mikro-orm/migrations';

export class Migration20250227233909 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create index "pokemon_slug_index" on "pokemon" ("slug");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "pokemon_slug_index";`);
  }

}
