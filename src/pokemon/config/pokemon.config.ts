import { registerAs } from "@nestjs/config"

export default registerAs('pokemon', () => ({
  example: 'pikachu',
}));

/**
 * Register ConfigModule.forFeature(pokemon) in imports for the module
 * Called partial registration
 * Allows for feature specific modules
 * 
 * In Services:
 * private readonly configService: ConfigService
 * const pokemonConfig = this.configService.get('pokemon') 
 * const res = pokemonConfig.get('pokemon.example') -> 'pikachu'
 * 
 * Its better to do the following for type safety (strong typing)
 * @Inject(pokemon.KEY)
 * private readonly pokemonConfiguration: ConfigType<typeof pokemonConfig>
 */

