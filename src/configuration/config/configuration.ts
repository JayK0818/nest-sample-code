const configuration = () => {
  console.log('执行了吗?');
  return {
    port: Number.parseInt(process.env.PORT as string, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATAUSER_PASSWORD,
    },
    message: 'from configuration file',
  };
};

export default configuration;
