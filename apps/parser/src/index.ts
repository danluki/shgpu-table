import "dotenv/config";
import { PORTS } from "../../../libs/grpc/servers/constants";

import {
  DeepPartial,
  ParserServiceImplementation,
  ParserDefinition,
  ProcessTableRequest,
  ProcessTableResponse,
} from "../../../libs/grpc/generated/parser/parser";
import { createServer, ServerError, Status } from "nice-grpc";
import { createParserByFaculty } from "./helpers/createParserByFaculty";
import { DownloadTableError } from "./errors/downloadTableError";
import { UnknownFacultyError } from "./errors/unkownFacultyError";
async function start() {
  const parserServiceImpl: ParserServiceImplementation = {
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
          isNew: procTableInfo.isNew,
          isUpdated: procTableInfo.isModified,
          weekBegin: procTableInfo.weekBegin,
          weekEnd: procTableInfo.weekEnd,
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
