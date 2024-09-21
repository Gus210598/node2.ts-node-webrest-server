import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

            //* Routes
            const todoController = new TodosController();

            router.get('/', todoController.getTodos );
            router.get('/:id', todoController.getTodosById );

            router.post('/:id', todoController.createTodo );
            
            router.put('/:id', todoController.updateTodo );

            router.delete('/:id', todoController.deleteTodo );

        return router;
    }


}
