/*
    @return model from mongoose
*/
const getDBModel = async (db, modelName) => {
    return db.model(modelName);
};

export default getDBModel;
