export function createClientAddr(env: string, service: string, port: number): string {
    let ip = service;
    if (env != "production") {
        ip = "127.0.0.1"
    }

    return `${ip}:${port}`
}