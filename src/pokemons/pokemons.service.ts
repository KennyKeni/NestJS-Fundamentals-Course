import { Injectable } from '@nestjs/common';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonsService {
  private pokemons: Pokemon[] = [
    {
      pokemon_id: 1,
      name: "Pikachu",
      image_url: "https://open.spotify.com/track/0eCyJaA5LWxYZgbGF1gORO",
      shiny_url: "https://open.spotify.com/track/0eCyJaA5LWxYZgbGF1gORO",
      generation: 1,
      description: "This is pikachu",
    },
  ];

  findAll() {
    return this.pokemons;
  }

  findOne(pokemon_id: string) {
    return this.pokemons.find(item => item.pokemon_id === +pokemon_id)
  }

  create(CreatePokemonDto: any) {
    this.pokemons.push(CreatePokemonDto);
    return CreatePokemonDto;
  }

  update(pokemon_id: string, updatePokemonDto: any) {
    const existingPokemon = this.findOne(pokemon_id);
    if (existingPokemon) {
      // update
    }
  }

  remove(pokemon_id: string) {
    const pokemonId = this.pokemons.findIndex(item => item.pokemon_id === + pokemon_id);
    if (pokemonId >= 0) {
      this.pokemons.splice(pokemonId, 1);
    }
  }
}
