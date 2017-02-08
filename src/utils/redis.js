var Redis = require('ioredis');

var client = new Redis({
  port: appSettings.redis.port,
  host: appSettings.redis.host,
  db: appSettings.redis.db,
});

client.on('error', function (err) {
  if (err) {
    logger.error('connect to redis error, check your appsettings redis config', err);
    process.exit(1);
  }
})

exports = module.exports = client;
