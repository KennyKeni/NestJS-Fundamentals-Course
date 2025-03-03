import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { PokemonsController } from './pokemon.controller';
import { PokemonsService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonStat } from './entities';
import { PokemonTypeModule } from '@app/pokemon-type/pokemon-type.module';
import { ApiKeyGuard } from '@app/common/guards/api-key/api-key.guard';

// import { ConfigModule } from '@nestjs/config';
// import pokemonConfig from './config/pokemon.config';

@Module({
  imports: [
    MikroOrmModule.forFeature([Pokemon, PokemonStat]),
    // ConfigModule.forFeature(pokemonConfig), # Partial registration
    forwardRef(() => PokemonTypeModule)
  ],
  exports: [MikroOrmModule.forFeature([Pokemon])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonModule {}
