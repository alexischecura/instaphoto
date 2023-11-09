require('dotenv').config();
import { PrismaClient } from '@prisma/client';
import app from './app';
import { envVars } from './configs/envConfig';

const prisma = new PrismaClient();

app.listen(envVars.PORT, () => {
  console.log(`Server running in port ${envVars.PORT}`);
});
