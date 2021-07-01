const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');


if(process.env.NODE_ENV === 'test'){
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = new MongoMemoryServer()

    const connect = async () => {
        const uri = await mongod.getUri();
        // console.log(uri)
        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        await mongoose.connect(uri,mongooseOpts)
    }
    const close = async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop()
    }

    const clear = async () => {
        const collections = mongoose.connection.collections;
        for(const key in collections) {
            const collection = collections[key];
            await collection.deleteMany()
        }
    }
    module.exports = {connect,close,clear}
}
else{
  
    try {
        mongoose.connect(db,
            {
                useNewUrlParser: true
                , useUnifiedTopology: true
                , useCreateIndex: true,
                useFindAndModify: false
            });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

}
