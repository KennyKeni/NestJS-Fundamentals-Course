import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot(), 
    PokemonsModule, 
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
