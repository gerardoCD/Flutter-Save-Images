import { MongoClient } from "mongodb";
const mongoose = require("mongoose");

const mongoConfig = {
  user: process.env.MONGO_USER,
  host: process.env.MONGO_HOST,
  database: process.env.MONGO_DBNAME,
  password: process.env.MONGO_PASSWORD,
  port: Number(process.env.MONGO_PORT),
};

export async function mongoConnect(): Promise<MongoClient> {
  // const conf = getConfigMongo();
  // const uri = `mongodb+srv://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}`; //local
  const uri = `mongodb+srv://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}/admin?retryWrites=true&w=majority`;
  const mc = new MongoClient(uri, { useUnifiedTopology: true });
  const out = await mc
    .connect()
    .then((v: MongoClient) => {
      console.log("Connected to database ");
      return v;
    })
    .catch((e: any) => {
      throw Error("No se pudo conectar " + e);
    });

  return out;
}

export const insertMongoBuro = async (responseBuro: any) => {
  const mongoDB = await mongoConnect();
  try {
    const result = await mongoDB
      .db("ImageDataBase")
      .collection("user")
      .insertOne(responseBuro);
    return result;
  } catch (e) {
    console.log("e :", e);
    throw Error(e);
  } finally {
    mongoDB.close();
  }
};

export async function findByIdBuro(deviceID: any, path: any) {
  const mongoDB = await mongoConnect();
  try {
    // var jsonFind = {
    //   deviceID: "PPYS29.105-134-12",
    //   path:
    //     "/storage/emulated/0/Pictures/Screenshots/Screenshot_20190705-162318.png",
    // };
    var jsonFind = {
        "deviceID": deviceID,
        "path":
        path,
    };
    console.log('jsonFind :', jsonFind);
    const result = await mongoDB
      .db(mongoConfig.database)
      .collection("user")
      .find(jsonFind).toArray();
      return result
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
}
