import * as restify from 'restify';
import * as errors from 'restify-errors'

const server = restify.createServer({
    name: 'meat-api',
    version: '0.0.1'
});

server.get('/hello', (req, resp, next) => {
    // resp.contentType = 'application/json';
    // resp.status(200);
    // resp.setHeader('Content-Type', 'application/json');
    // resp.send({messsage: 'Ayo'});
    resp.json({ message: 'Hello World.' }); //o json é de certa forma = send(), sendo que ele busca inferir algumas infos que podem/devem ser definidas antes de um send como descrito acima
    return next();
});

server.use(restify.plugins.queryParser());

let i: number = 0;

server.get('/info', [   //método get pode ter diversas callbacks empilhadas
    // (req, resp, next) => {
    //     for (i; i < 10; i++) {
    //         i++;
    //     }

    //     if (i === 10) {
    //         resp.json({ total: 'Passou' });
    //         return next();
    //     } else {
    //         // return next(false);
    //         // let err:any = new Error();
    //         // err.statusCode = 400;
    //         // err.message = 'Bad Request';
    //         // return next(err);
    //         return next(new errors.BadRequestError('Bad Request')); 
    //         //O método next indica a próxima chamada na stack || para a execução ao passar false como parametro || pode enviar mensagens de erro
    //     }
    // },
    (req, resp, next) => {
        resp.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.href(),
            path1: req.getUrl(), // obj completo
            path2: req.url, // string simples com /info
            path3: req.path(), // mesmo que path2
            query: req.query,
            total_i_callback_anterior: i
        });
        return next();
    }]);


server.listen(3000, () => {
    console.log(`${server.name} API is running on http://localhost:3000/hello`);
});



