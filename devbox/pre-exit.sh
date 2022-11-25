finish()
{
  docker compose -f docker-compose.dev.yml stop > /dev/null 2>&1
  echo "Services stopped, exiting."
}
trap finish EXIT SIGHUP