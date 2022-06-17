import { Router } from "../common/router";
import * as restify from "restify";

class UsersRoute extends Router {
    applyRouters(application: restify.Server) { 
        application.get('/users', (req, resp, next) => {
            resp.json({
                users: [
                    {id: 1, name: 'User 1'},
                    {id: 2, name: 'User 2'},
                    {id: 3, name: 'User 3'}
                ]
            });
            return next();
        }
        );
    }
}

export const _UsersRoute = new UsersRoute();