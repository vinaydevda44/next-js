import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection =mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        connection.on('error', (err) => {
            console.log("MongoDB connection error:", err);
            process.exit(1); 
        });
    }
    catch(err){
        console.log("Error connecting to MongoDB:", err);;
    }
}