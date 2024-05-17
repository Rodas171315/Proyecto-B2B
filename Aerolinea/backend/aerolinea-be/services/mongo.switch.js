import connectDB from "./mongo.connect.js";

/* Switch db on same connection pool
    @return new connection
*/
const switchDB = async (dbName, dbSchema) => {
    const mongoose = await connectDB();
    if (mongoose.connection.readyState === 1) {
        const db = mongoose.connection.useDb(dbName, { useCache:true });
        console.log('Switched to DB '+dbName);
        // Prevent from schema re-registration
        if (!Object.keys(db.models).length) {
            dbSchema.forEach((schema, modelName) => {
                db.model(modelName, schema);
            });
        }
        return db;
    }
    throw error;
};

export default switchDB;
