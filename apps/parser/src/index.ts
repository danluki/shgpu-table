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

async function start() {
  const parserServiceImpl: ParserServiceImplementation = {
    async checkLocalTableDate(
      request: CheckLocalTableModifyDateRequest
    ): Promise<DeepPartial<CheckLocalTableModifyDateResponse>> {
      const parser = new Parser();
      const date = await parser.getTableModifyDate(
        request.tableName,
        request.facultyId
      );
      console.log(date);
      return {
        modifyDate: date,
      };
    },
  };
  const server = createServer();
  server.add(ParserDefinition, parserServiceImpl);
  await server.listen(`0.0.0.0:${PORTS.PARSER_SERVER_PORT}`);
  console.log("Parser service has been started");
}

start();
