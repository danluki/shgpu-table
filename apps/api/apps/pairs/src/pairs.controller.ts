import { TableMsg } from './dtos/table.msg';
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PairsService } from './pairs.service';

@Controller()
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @Get('/1')
  async get() {
    return 'Hello 1';
  }

  @EventPattern('new_table')
  async handleNewTable(data: TableMsg) {
    console.log(data);
    const { faculty, link, tableWeek } = data;
    if (!faculty || !link || !tableWeek) return;

    // if (tableWeek >= new Date()) {
    //   //await this.eventsService.emit('created', data);
    // } else {
    //   //this.eventsService.emit('created', data);
    // }
    return { ok: true };
  }

  @EventPattern('table_modified')
  async handleTableModified(data: Record<string, unknown>) {
    const { faculty, link, tableWeek } = data;
    if (!faculty || !link || !tableWeek) return;

    if (tableWeek >= new Date()) {
      //this.eventsService.emit('modified', data);
    } else {
      //this.eventsService.emit('modified', data);
    }
    return { ok: true };
  }
}
