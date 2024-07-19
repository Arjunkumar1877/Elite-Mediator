import { connectDb } from "./frameworks/database/mongoDb/MongoDb";
import { ExpressServer } from "./frameworks/server/Express/ExpressJs";


const connectServer: any = new ExpressServer();
connectServer;
connectDb();
