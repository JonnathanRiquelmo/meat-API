import * as restify from 'restify';
import { environment as env } from '../common/environment';
import { Router } from '../common/router';

// Classe servidor para encapsular forma de ínicio da API REST
export class Server {

    application: restify.Server

    //Cria server e registra rotas com o auxílio de um conjunto de rotas definidas (classe abstrata)
    initRoutes(routes: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '0.0.1'
                });

                this.application.use(restify.plugins.queryParser());

                // Rotas
                routes.forEach(route => {
                    route.applyRouters(this.application);
                });

                this.application.listen(env.server.port, () => {
                    resolve(this.application)
                })
            } catch (error) {
                reject(error)
            };
        });
    };

    // Inicialiação do servidor registrando as rotas
    bootstrap(routes: Router[] = []): Promise<Server> {
        return this.initRoutes(routes).then(() => this)
    }

}