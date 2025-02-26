/**
 * EntitySource defines where the entity in question orginates from, this is to seperate Pokemons or Items
 * unique to Cobblemon or the Delta server
 */
export enum EntitySource {
  POKEMON = 'pokemon',
  MINECRAFT = 'minecraft',
  COBBLEMON = 'cobblemon',
  DELTA = 'cobblemon_delta',
  UNKNOWN = 'unknown',
}


