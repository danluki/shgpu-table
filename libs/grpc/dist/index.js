"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_util_1 = require("node:util");
const promisedExec = (0, node_util_1.promisify)(node_child_process_1.exec);
(0, node_fs_1.rmSync)("generated", { recursive: true, force: true });
(() => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, promises_1.readdir)("./protos");
    yield Promise.all(files
        .filter((n) => n != "google")
        .map((proto) => __awaiter(void 0, void 0, void 0, function* () {
        const [name] = proto.split(".");
        if (!(0, node_fs_1.existsSync)(`generated/${name}`)) {
            (0, node_fs_1.mkdirSync)(`generated/${name}`, { recursive: true });
        }
        const requests = yield Promise.all([
            promisedExec(`protoc --go_out=./generated/${name} --go_opt=paths=source_relative --experimental_allow_proto3_optional --go-grpc_out=./generated/${name} --go-grpc_opt=paths=source_relative --proto_path=./protos ${name}.proto`),
            promisedExec(`protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --experimental_allow_proto3_optional --ts_proto_out=./generated/${name} --ts_proto_opt=outputServices=nice-grpc,outputServices=generic-definitions,useExactTypes=false,esModuleInterop=true --proto_path=./protos ${name}.proto`),
        ]);
        console.info(`✅ Genered ${name} proto definitions for go and ts.`);
        return requests;
    })));
}))();
//# sourceMappingURL=index.js.map