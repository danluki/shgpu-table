import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [GroupsService],
  controllers: [],
  exports: [GroupsService],
})
export class GroupsModule {}
