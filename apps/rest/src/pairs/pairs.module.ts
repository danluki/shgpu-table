import { PairsController } from './pairs.controller';
import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { EventsService } from './events/events.service';

@Module({
  imports: [TypeOrmModule.forFeature(), GroupsModule],
  controllers: [PairsController],
  providers: [PairsService, EventsService],
})
export class PairsModule {}
