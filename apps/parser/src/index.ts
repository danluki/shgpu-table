import "dotenv/config";
import { PORTS } from "../../../libs/grpc/servers/constants";

import {
  CheckLocalTableModifyDateRequest,
  CheckLocalTableModifyDateResponse,
  DeepPartial,
  ParserServiceImplementation,
  ParserDefinition,
} from "../../../libs/grpc/generated/parser/parser";
import { createServer, ServerError, Status } from "nice-grpc";
import { Parser } from "./parsers/parser";
import { createParserByFaculty } from "./helpers/createParserByFaculty";

async function start() {
  const parserServiceImpl: ParserServiceImplementation = {
    async processTable(
      request: ProcessTableRequest
    ): Promise<DeepPartial<ProcessTableResponse>> {
      const parser = createParserByFaculty(request.facultyId);
      parser.processTable(request.tableLink);
    },
  };
  const server = createServer();
  server.add(ParserDefinition, parserServiceImpl);
  await server.listen(`0.0.0.0:${PORTS.PARSER_SERVER_PORT}`);
  console.log("Parser service has been started");
}

start();
