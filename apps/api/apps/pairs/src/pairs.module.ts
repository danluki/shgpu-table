import { Module } from '@nestjs/common';
import { PairsController } from './pairs.controller';
import { PairsService } from './pairs.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/pairs/.env',
    }),
    RmqModule,
  ],
  controllers: [PairsController],
  providers: [PairsService],
})
export class PairsModule {}
