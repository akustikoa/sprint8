import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto';
import db from '../db/connection'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        console.log();
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares(); //sempre abans dels routes
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicion corriendo en el puerto ${this.port}`)
        })
    }


    //ruta raiz
    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            })

        })

        this.app.use('/api/productos', routesProducto);
    }

    midlewares() {
        //parseamos el body
        this.app.use(express.json())

        //cors 
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('bd connectada')
        } catch (error) {
            console.log(error);
            console.log('error en la conexió de la bd')

        }

    }

}



export default Server;