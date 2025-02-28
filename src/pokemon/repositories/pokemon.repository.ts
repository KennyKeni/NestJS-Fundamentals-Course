import { EntityRepository } from "@mikro-orm/postgresql";
import { Pokemon } from "../entities";

export class PokemonRepository extends EntityRepository<Pokemon> {
  async findAllPokemonsDetailed() {
    return this.createQueryBuilder('p')
    .select('*')
    .leftJoinAndSelect('p.stats', 'ps')
    .leftJoinAndSelect('p.pokemon_typing', 'pt')
    .leftJoinAndSelect('pt.type', 't')
    .getResultList();
  }

  async existsByName(name: string): Promise<boolean> {
    const result = await this.getEntityManager().execute(
      `SELECT EXISTS(SELECT 1 FROM pokemon WHERE name = ?) AS exists;`,
      [name.trim()]
    );
    return result[0].exists;

  }
}