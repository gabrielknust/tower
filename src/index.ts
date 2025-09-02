import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(process.env.APP_PORT, () => {
  console.log(`App is running on port ${process.env.APP_PORT}`);
});
