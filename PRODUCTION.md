# Deploy to production
Get doppler token
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

