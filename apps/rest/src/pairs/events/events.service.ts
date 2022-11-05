import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';
@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe() {
    return fromEvent(this.emitter, 'eventName');
  }

  async emit(data: any) {
    this.emitter.emit('eventName', { data });
  }
}
