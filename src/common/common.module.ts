import { Module } from '@nestjs/common';
import { MetadataEntity } from './entities';

@Module({
  exports: [MetadataEntity]
})
export class CommonModule {}
