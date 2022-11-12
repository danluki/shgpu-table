import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';
@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(channel: string) {
    return fromEvent(this.emitter, channel);
  }

  async emit(channel: string, data: any) {
    try {
      this.emitter.emit(channel, { data });
    } catch (er) {
      console.log(er);
    }
  }
}
