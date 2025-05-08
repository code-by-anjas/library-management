const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENPOINT as string,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
    },
    databaseUrl: process.env.DATABASE_URL as string,
    upstash: {
      redisToken: process.env.UPSTASH_REDIS_TOKEN as string,
      redisUrl: process.env.UPSTASH_REDIS_URL as string,
      qstashToken: process.env.QSTASH_TOKEN as string,
      qstashUrl: process.env.QSTASH_URL as string,
    },
  },
};

export default config;
