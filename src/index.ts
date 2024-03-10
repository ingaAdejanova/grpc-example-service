import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
