import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });

app.listen(process.env.PORT, () => {
  console.log(
    `listening on port http://${process.env.HOSTNAME}:${process.env.PORT}`
  );
});
