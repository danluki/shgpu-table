# Deploy to production

Set doppler docker environment token environment variable
```
export DOPPLER_TOKEN="${{ secrets.DOPPLER_TOKEN }}"
```

Run
```
docker compose -f docker-compose.yml up
```

