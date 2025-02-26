import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonsModule } from './pokemon/pokemon.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(), 
    PokemonsModule, 
    PokemonTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
