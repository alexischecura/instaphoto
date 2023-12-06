require('dotenv').config();
import app from './app';
import { envVars } from './configs/envConfig';
import prisma from './database/databaseApi';

const init = async () => {
  app.listen(envVars.PORT, () => {
    console.log(`Server running in port ${envVars.PORT}`);
  });
};

init()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
