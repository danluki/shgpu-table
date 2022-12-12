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

async function start() {
  const parserServiceImpl: ParserServiceImplementation = {
    async processTable(
      request: ProcessTableRequest
    ): Promise<DeepPartial<ProcessTableResponse>> {
      try {
      } catch (err) {
        console.log(err);
        if (err instanceof ServerError) {
          throw err;
        }
        if (err instanceof DownloadTableError) {
        }
        throw new ServerError(Status.CANCELLED, "CANCELLED");
      }
      const parser = createParserByFaculty(request.facultyId);
      const procTableInfo = parser.processTable(request.tableLink);

      return response;
    },
  };
  const server = createServer();
  server.add(ParserDefinition, parserServiceImpl);
  await server.listen(`0.0.0.0:${PORTS.PARSER_SERVER_PORT}`);
  console.log("Parser service has been started");
}

start();
