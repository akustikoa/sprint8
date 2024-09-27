import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routesProducto from '../routes/producto';
import routesLocation from '../routes/location';
import db from '../db/connection';

// Carrega les variables d'entorn des del fitxer .env
dotenv.config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        console.log();
        this.app = express();
        this.port = process.env.PORT || '3001';  // Usa el port del fitxer .env o 3001 per defecte
        this.listen();
        this.midlewares(); //sempre abans dels routes
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicació corrent en el port ${this.port}`);
        });
    }

    //ruta raíz
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
        //parseamos el body
        this.app.use(express.json());

        //cors 
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
