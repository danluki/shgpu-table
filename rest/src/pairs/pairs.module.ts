import { PairsController } from './pairs.controller';
import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';

@Module({
  imports: [],
  controllers: [PairsController],
  providers: [PairsService],
})
export class PairsModule {}
