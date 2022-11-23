import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { PairsModule } from './pairs/pairs.module';

@Module({
  imports: [PairsModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
