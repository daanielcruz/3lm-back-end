import server from './server';

server.listen(process.env.PORT || 3333, () => {
  console.log(`Its running at ${process.env.PORT}!`);
});
