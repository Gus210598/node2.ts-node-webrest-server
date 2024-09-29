import { Request, Response } from "express"
import { prisma } from '../../data/postgres';
import { error } from "console";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

    constructor() {}

    public getTodos = async(req: Request, res: Response) => {

        const todos = await prisma.todo.findMany()

        return res.json(todos);

    };

    public getTodosById = async( req: Request, res: Response ) => {

        const id = +req.params.id;

        if ( isNaN( id ) ) return res.status(400).json({ error: 'ID argument is not a number' });

        //* Para este caso puntual se puede hacer la busqueda por findUnique o findFirst
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });

         ( todo )
        ? res.json( todo )
        : res.status(404).json({ error: `TODO with id ${ id } not found` })

       
    }

    public createTodo = async( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
        
        if ( error ) return res.status(400).json({ error })
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        
        res.json( todo );

    }
    
    public updateTodo = async( req: Request, res: Response ) => {

        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create({
            ...req.body, id
        })

        if ( error ) return res.status(400).json({ error })

        let todo = await prisma.todo.findFirst({
            where: { id }
        })

        if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` })

        
        const updateTodo = await prisma.todo.update({
            where: { id },
            data:  updateTodoDto!.values
        });

        res.json( updateTodo );

        // todo.text = text || todo.text;
        
        // ( completedAt === 'null' )
        // ? todo.completedAt = null 
        // : todo.completedAt = new Date( completedAt || todo.completedAt );
        
        
        // if ( !text ) return res.status(400).json({ error: "Text property is required" });
        // res.json( todo );
    }

    public deleteTodo = async( req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN( id ) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        ( deleted )
            ? res.json( deleted )
            : res.status(400).json({ error: `Todo with id ${ id } not found` })


        // res.json({ todo, deleted });
        

        // const todos: string= todo
        // const todo = todos.filter( todo => todo.id !== id );

        // let todo = todos.find( todo => todo.id === id );
        // if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found`});

        // todos.splice( todos.indexOf( todo ), 1 );
        
        // res.json( todo );


    }

}


