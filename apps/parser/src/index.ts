import "dotenv/config";
import { PORTS } from "../../../libs/grpc/servers/constants";

import {
  DeepPartial,
  ParserServiceImplementation,
  ParserDefinition,
  ProcessTableRequest,
  ProcessTableResponse,
  GetGroupRequest,
  GetGroupResponse,
  GetPairsByDatesRequest,
  GetPairsResponse,
  GetPairsByDaysRequest,
  GetPairsByLectuerRequest,
  GetPairsByLectuerResponse,
} from "../../../libs/grpc/generated/parser/parser";
import { createServer, ServerError, Status } from "nice-grpc";
import { createParserByFaculty } from "./helpers/createParserByFaculty";
import { DownloadTableError } from "./errors/downloadTableError";
import { UnknownFacultyError } from "./errors/unkownFacultyError";
import { AppDataSource } from "../../../libs/typeorm/src";
import { Group } from "../../../libs/typeorm/src/entities/group";
import repository from "./repository";
async function start() {
  const parserServiceImpl: ParserServiceImplementation = {
    async getPairsByDates(
      request: GetPairsByDatesRequest
    ): Promise<DeepPartial<GetPairsResponse>> {
      if (!request.groupName) {
        throw new ServerError(Status.INVALID_ARGUMENT, "Invalid groupName");
      }
      if (!request.dateBegin || !request.dateEnd) {
        throw new ServerError(
          Status.INVALID_ARGUMENT,
          "Specify dateBegin and dateEnd"
        );
      }
      // if (request.dateBegin >= request.dateEnd) {
      //   throw new ServerError(
      //     Status.INVALID_ARGUMENT,
      //     "Begin date must be less than end date"
      //   );
      // }
      console.log(request.dateBegin);
      const group = await repository.getGroup(request.groupName);
      if (!group) {
        throw new ServerError(
          Status.NOT_FOUND,
          "Can't find group with this group name"
        );
      }
      const pairs = await repository.getPairsByDates(
        request.groupName,
        request.dateBegin,
        request.dateEnd
      );
      console.log(pairs);
      return pairs;
    },
    async getPairsByDays(
      request: GetPairsByDaysRequest
    ): Promise<DeepPartial<GetPairsResponse>> {
      return null;
    },
    async getPairsByLectuer(
      request: GetPairsByLectuerRequest
    ): Promise<DeepPartial<GetPairsByLectuerResponse>> {
      return null;
    },
    async getGroup(
      request: GetGroupRequest
    ): Promise<DeepPartial<GetGroupResponse>> {
      if (!request.groupName) {
        throw new ServerError(Status.INVALID_ARGUMENT, "Invalid groupName");
      }

      const group = await repository.getGroup(request.groupName);
      if (!group) {
        throw new ServerError(
          Status.NOT_FOUND,
          "Can't find group with this group name"
        );
      }

      return {
        groupName: group.name,
        facultyId: group.faculty.id,
        facultyName: group.faculty.name,
      };
    },
    async processTable(
      request: ProcessTableRequest
    ): Promise<DeepPartial<ProcessTableResponse>> {
      try {
        if (!request.facultyId || !request.tableLink) {
          throw new ServerError(
            Status.INVALID_ARGUMENT,
            "Invalid facultyId or tableLink"
          );
        }
        const parser = createParserByFaculty(request.facultyId);
        const procTableInfo = await parser.processTable(request.tableLink);
        return {
          facultyId: procTableInfo.facultyId,
          isNew: procTableInfo.isNew,
          isUpdated: procTableInfo.isModified,
          weekBegin: procTableInfo.weekBegin,
          weekEnd: procTableInfo.weekEnd,
          link: procTableInfo.link,
        };
      } catch (err) {
        console.log(err);
        if (err instanceof ServerError) {
          throw err;
        }
        if (err instanceof DownloadTableError) {
          throw new ServerError(Status.INVALID_ARGUMENT, err.message);
        }
        if (err instanceof UnknownFacultyError) {
          throw new ServerError(Status.INVALID_ARGUMENT, "Invalid facultyId");
        }
        throw new ServerError(Status.CANCELLED, "CANCELLED");
      }
    },
  };
  const server = createServer();
  server.add(ParserDefinition, parserServiceImpl);
  await server.listen(`0.0.0.0:${PORTS.PARSER_SERVER_PORT}`);
  console.log("Parser service has been started");
}

start();
