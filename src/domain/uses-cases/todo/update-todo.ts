import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entitys";
import { TodoRepository } from "../../respositories/todo.repository";

export interface UpdateTodoUseCase {
    execute( dto: UpdateTodoDto ): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) {}

    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById( dto );

    }

}