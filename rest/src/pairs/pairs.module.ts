import { GroupsService } from './../groups/groups.service';
import { PairsController } from './pairs.controller';
import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(), GroupsService],
  controllers: [PairsController],
  providers: [PairsService],
})
export class PairsModule {}
