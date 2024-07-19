"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDb_1 = require("./frameworks/database/mongoDb/MongoDb");
const ExpressJs_1 = require("./frameworks/server/Express/ExpressJs");
const connectServer = new ExpressJs_1.ExpressServer();
connectServer;
(0, MongoDb_1.connectDb)();
