import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(
      'url',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
  } catch (error) {
    console.log(`Could not connect to MongoDB: ${error}`)
  }
}

export default connectDb;