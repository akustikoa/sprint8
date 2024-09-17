import Server from "./models/server";
import dotenv from 'dotenv'

//configurem les variables d'ambient
dotenv.config();

const server = new Server();