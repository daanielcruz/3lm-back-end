import server from './server';
import dotenv from 'dotenv';
dotenv.config();

server.listen(3333 || process.env.PORT, () => {
  console.log('Its running!');
});
