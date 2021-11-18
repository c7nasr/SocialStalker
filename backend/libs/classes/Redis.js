const Redis = require("ioredis");

class RedisCloud {
  constructor() {
    this.RedisCloud = null;
    this.redis_options = {
      host: "redis-14377.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
      port: 14377,
      password: "09lkIBcAPwYeHTWu9XaOF29TIwsfwJhs",
      maxRetriesPerRequest: 0,
      enableReadyCheck: false,
      retryStrategy: (options) => {
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error("Retry time exhausted");
        }
        if (options.attempt > 5) {
          return new Error("Max attempts reached");
        }
        if (options.error && options.error.code === "ECONNREFUSED") {
          return 500;
        }
        return Math.min(options.attempt * 100, 3000);
      },
    };

    this.client = null;
    this.subscriber = null;
  }
  RedisCloudInitialization() {
    const ThisClass = this;
    this.RedisCloud = {
      createClient: function (type, redisOpts) {
        switch (type) {
          case "client":
            if (!ThisClass.client) {
              ThisClass.client = new Redis({
                host: "redis-14377.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
                port: 14377,
                password: "09lkIBcAPwYeHTWu9XaOF29TIwsfwJhs",
                maxRetriesPerRequest: 0,
                enableReadyCheck: false,
              });
            }
            return ThisClass.client;
          case "subscriber":
            if (!ThisClass.subscriber) {
              ThisClass.subscriber = new Redis({
                host: "redis-14377.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
                port: 14377,
                password: "09lkIBcAPwYeHTWu9XaOF29TIwsfwJhs",
                maxRetriesPerRequest: 0,
                enableReadyCheck: false,
              });
            }
            return ThisClass.subscriber;
          case "bclient":
            return new Redis({
              host: "redis-14377.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
              port: 14377,
              password: "09lkIBcAPwYeHTWu9XaOF29TIwsfwJhs",
              maxRetriesPerRequest: 0,
              enableReadyCheck: false,
            });
          default:
            throw new Error("Unexpected connection type: ", type);
        }
      },
    };

    return this.RedisCloud;
  }
}
module.exports.RedisCloud = RedisCloud;
