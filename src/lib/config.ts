const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENPOINT as string,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
    },
    databaseUrl: process.env.DATABASE_URL as string,
  },
};

export default config;
