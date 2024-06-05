import { connectDb } from "./frameworks/database/mongoDb/MongoDb";
import { ExpressServer } from "./frameworks/server/Express/ExpressJs";


const connectServer = new ExpressServer();
connectDb();
