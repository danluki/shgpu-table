import "dotenv/config";
import { AppDataSource } from "../../../libs/typeorm/src";
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
  GetFacultiesRequest,
  GetFacultiesResponse,
} from "../../../libs/grpc/generated/parser/parser";
import { createServer, ServerError, Status } from "nice-grpc";
import { createParserByFaculty } from "./helpers/createParserByFaculty";
import { DownloadTableError } from "./errors/downloadTableError";
import { UnknownFacultyError } from "./errors/unkownFacultyError";
import repository from "./repository";
import { Faculty } from "../../../libs/typeorm/src/entities/faculty";
async function start() {
  const repository = new Respository();
  respository.connect();
  const parserServiceImpl: ParserServiceImplementation = {
    async getFaculties(
      request: GetFacultiesRequest
    ): Promise<DeepPartial<GetFacultiesResponse>> {
      const faculties = await repository.getFaculties();

      return {
        faculties: faculties,
      };
    },
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
      if (request.dateBegin >= request.dateEnd) {
        throw new ServerError(
          Status.INVALID_ARGUMENT,
          "Begin date must be less than end date"
        );
      }
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
      return {
        faculty: {
          id: group.faculty.id,
          name: group.faculty.name,
        },
        pairs: pairs,
      };
    },
    async getPairsByDays(
      request: GetPairsByDaysRequest
    ): Promise<DeepPartial<GetPairsResponse>> {
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

      if (request.count <= 0) {
        throw new ServerError(
          Status.INVALID_ARGUMENT,
          "Count must be not negative"
        );
      }

      if (request.offset < 0) {
        throw new ServerError(
          Status.INVALID_ARGUMENT,
          "Offset must be positive"
        );
      }

      const currentDate = new Date();
      const pairs = await repository.getPairsByDays(
        request.groupName,
        currentDate,
        request.offset,
        request.count
      );
      return {
        faculty: {
          id: group.faculty.id,
          name: group.faculty.name,
        },
        pairs: pairs,
      };
    },
    async getPairsByLectuer(
      request: GetPairsByLectuerRequest
    ): Promise<DeepPartial<GetPairsByLectuerResponse>> {
      if (!request.lectuerName)
        throw new ServerError(Status.INVALID_ARGUMENT, "Invalid lectuerName");
      if (!request.weekBegin || !request.weekEnd)
        throw new ServerError(Status.INVALID_ARGUMENT, "Invalid dates format");
      if (request.weekBegin >= request.weekEnd)
        throw new ServerError(
          Status.INVALID_ARGUMENT,
          "End date must be greater than begin date"
        );
      const pairs = await repository.getPairsByInstructor(
        request.lectuerName,
        request.weekBegin,
        request.weekEnd
      );
      return {
        pairs: pairs,
      };
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
  const typeorm = await AppDataSource.initialize();
  const fac = await typeorm.getRepository(Faculty).find();
  const server = createServer();
  server.add(ParserDefinition, parserServiceImpl);
  await server.listen(`0.0.0.0:${PORTS.PARSER_SERVER_PORT}`);
  console.log("Parser service has been started");
}

start();
