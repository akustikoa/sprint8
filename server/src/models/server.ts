import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routesProducto from '../routes/producto';
import routesLocation from '../routes/location';
import db from '../db/connection';

dotenv.config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        console.log();
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicació corrent en el port ${this.port}`);
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });

        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/locations', routesLocation);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('BD connectada');
        } catch (error) {
            console.log(error);
            console.log('Error en la connexió de la BD');
        }
    }
}

export default Server;
