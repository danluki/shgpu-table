import axios, { AxiosInstance } from "axios";
import EventSource from "eventsource";
import { nextWednesday } from "date-fns";
import { getWeekBorders } from "./functions/getWeekBorders";
import { ApiError } from "./exceptions/ApiError";
import { UnknownGroupError } from "./exceptions/UnknownGroupError";
import { GetPairsError } from "./exceptions/GetPairsError";
import { Group, } from "./models";
import EventEmitter from "events";

export class TableAPI extends EventEmitter {
  private readonly $axios: AxiosInstance;
  private readonly tableCreated: EventSource;
  private readonly tableUpdated: EventSource;

  constructor(apiHostname: string) {
    super();

    this.tableCreated = new EventSource(`${apiHostname}api/v1/pairs/created`);
    this.tableCreated.addEventListener("created", this.onTableCreated);

    this.tableUpdated = new EventSource(`${apiHostname}api/v1/pairs/modified`);
    this.tableUpdated.addEventListener("created", this.onTableUpdated);

    this.$axios = axios.create({
      baseURL: apiHostname,
    });
  }

  private onTableCreated(event: MessageEvent): void {
    this.emit("tableCreated", event);
  }

  private onTableUpdated(event: MessageEvent): void {
    this.emit("tableUpdated", event);
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
      const groupResult = await this.$axios.get(`api/v1/groups/${groupName}`);
      return groupResult.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500) {
          throw new ApiError(err.message, err);
        }

        throw new UnknownGroupError();
      }
    }
  }
}
