import { PairsController } from './pairs.controller';
import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature(), GroupsModule],
  controllers: [PairsController],
  providers: [PairsService],
})
export class PairsModule {}
