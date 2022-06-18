import { Router } from "../common/router";
import * as restify from "restify";
import { users } from "./users.model";

class UsersRoute extends Router {
    applyRouters(application: restify.Server) {
        application.get('/users', (req, resp, next) => {
            resp.json({
                users
            });
            console.table(users);
            return next();
        }),
            application.get('/users/:id', (req, resp, next) => {
                let user = users.find(user => user.id == req.params.id);
                if (!user) {
                    resp.json({
                        message: 'User not found'
                    });
                    return next();
                }
                resp.json(user);
                return next();
            });
    };
};

export const _UsersRoute = new UsersRoute();