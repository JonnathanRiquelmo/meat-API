import { Server } from '../src/server/server';
import { _UsersRoute } from './users/users.router';

const server = new Server();

// Inicializa o servidor passando a lista de rotas como parâmetro
server.bootstrap([_UsersRoute]).then(server => {
    console.log("Server is listening on: ", server.application.address());
}).catch(error => {
    console.log('Server failed to start!');
    console.log(error);
    process.exit(1);
});
