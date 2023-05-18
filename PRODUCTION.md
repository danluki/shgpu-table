# Deploy to production

Get doppler token, be sure to contact me before this step, cus u don't have access by default

```
doppler configs tokens create shgpu-table-token --project shgpu-table --config docker --plain
```

Set doppler docker environment token environment variable

```
export DOPPLER_TOKEN="${{ secrets.DOPPLER_TOKEN }}"
```

Run

```
docker compose -f docker-compose.yml up
```
