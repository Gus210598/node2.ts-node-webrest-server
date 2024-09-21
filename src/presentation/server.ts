import express from 'express';
import path from 'path';
import { Router } from 'express';

interface Options {
    port        : number;
    public_path?: string;
    routes       : Router;
}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {
        const { port, routes, public_path = 'public' } =  options;
        this.port       = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        
        //* Middlewares
        //! al usar "use" son los middlewares
        this.app.use( express.json() ); // row
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded


        //* Routes
        this.app.use( this.routes );

        //* Public Folder
        this.app.use( express.static( this.publicPath ) );

       



        //* comodin cualquier ruta no definida pasa por acá SPA
        this.app.get('*', ( req, res ) => {
            // console.log(req.url);
            // res.send('Hi desde cualquier ruta');
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile( indexPath );
            return;
        })  


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }  Jenny...`)
        })

    }
}
        

