import axios, { AxiosInstance } from "axios";
import EventSource from "eventsource";
import { nextWednesday } from "date-fns";
import { getWeekBorders } from "./functions/getWeekBorders";
import { ApiError } from "./exceptions/ApiError";
import { UnknownGroupError } from "./exceptions/UnknownGroupError";
import { GetPairsError } from "./exceptions/GetPairsError";
import { Group, Pair } from "./models";
import EventEmitter from "events";
import { ScheduleError } from "./exceptions/ScheduleError";

export class TableAPI extends EventEmitter {
  private readonly $axios: AxiosInstance;
  private tableUpdated: EventSource;

  constructor(apiHostname: string) {
    super();
    this.tableUpdated = new EventSource(`${apiHostname}/v1/pairs/notify`);
    this.tableUpdated.onmessage = (data) =>
      this.emit("tableUpdated", data.data);

    this.$axios = axios.create({
      baseURL: apiHostname,
    });
  }
  public async getWeekPairs(
    groupName: string,
    isCurrentWeek: boolean = true
  ): Promise<any[]> {
    try {
      const { weekStart, weekEnd } = isCurrentWeek
        ? getWeekBorders(new Date())
        : getWeekBorders(nextWednesday(new Date()));

      const pairsResult = await this.$axios.get(
        `api/v1/pairs?groupName=${groupName}&beginDate=${weekStart}&endDate=${weekEnd}`
      );
      return pairsResult.data;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          // throw new ApiError(err.message, err);
        }

        throw new GetPairsError();
      }
    }
  }

  public async getPairs(
    groupName: string,
    offset: number,
    count: number
  ): Promise<Pair[]> {
    try {
      const pairsResult = await this.$axios.get(
        `v1/pairs?groupName=${groupName}&daysOffset=${offset}&daysCount=${count}`
      );
      return pairsResult.data;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          throw new ApiError(err.message, err);
        }

        throw new GetPairsError();
      }
    }
  }

  public async getGroup(groupName: string): Promise<Group> {
    try {
      const groupResult = await this.$axios.get(`v1/groups/${groupName}`);
      return groupResult.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          throw new ApiError(err.message, err);
        }

        throw new UnknownGroupError();
      }
      throw err;
    }
  }

  public async getSchedule(): Promise<any[]> {
    try {
      const scheduleResult = await this.$axios.get(`api/v1/pairs/schedule`);

      if (scheduleResult.data.length !== 6) {
        throw new ScheduleError();
      }
      return scheduleResult.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          throw new ApiError(err.message, err);
        }

        throw new ScheduleError();
      }
    }
  }
}
