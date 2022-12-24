import { exec } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { promisify } from "node:util";
const promisedExec = promisify(exec);
rmSync('generated', { recursive: true, force: true });
(async () => {
    const files = await readdir('./protos');
    await Promise.all(files
        .filter((n) => n != 'google')
        .map(async (proto) => {
        const [name] = proto.split('.');
        if (!existsSync(`generated/${name}`)) {
            mkdirSync(`generated/${name}`, { recursive: true });
        }
        const requests = await Promise.all([
            promisedExec(`protoc --go_out=./generated/${name} --go_opt=paths=source_relative --experimental_allow_proto3_optional --go-grpc_out=./generated/${name} --go-grpc_opt=paths=source_relative --proto_path=./protos ${name}.proto`),
            promisedExec(`protoc --plugin=protoc-gen-ts_proto=./../../node_modules/.bin/protoc-gen-ts_proto --experimental_allow_proto3_optional --ts_proto_out=./generated/${name} --ts_proto_opt=outputServices=nice-grpc,outputServices=generic-definitions,useExactTypes=false,esModuleInterop=true --proto_path=./protos ${name}.proto`),
        ]);
        console.info(`✅ Genered ${name} proto definitions for go and ts.`);
        return requests;
    }));
})();
//# sourceMappingURL=index.js.map