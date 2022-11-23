import { Module } from '@nestjs/common';
import { PairsController } from './pairs.controller';

@Module({
  imports: [],
  controllers: [PairsController],
  providers: [],
})
export class PairsModule {}
