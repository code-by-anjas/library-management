const config = {
  env: {
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENPOINT as string,
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
    resendToken: process.env.RESEND_TOKEN as string,
  },
};

export default config;
