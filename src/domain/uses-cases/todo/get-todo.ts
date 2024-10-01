import { TodoEntity } from "../../entities/todo.entitys";
import { TodoRepository } from "../../respositories/todo.repository";

export interface GetTodoUseCase {
    execute( id: number ): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) {}

    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById( id );

    }

}