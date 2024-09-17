import express, { Application } from 'express'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`apliacion corriendo en el puerto ${this.port}`)
        })
    }
    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'apiworking
                '
            })
        })
    }
}

export default Server;