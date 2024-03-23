import 'dotenv/config';
import app from './src/app.js';

app.listen(process.env.PORT, () => {
  console.log(
    `listening on port http://${process.env.HOSTNAME}:${process.env.PORT}`
  );
});
