import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todos";

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error
        });
    }
}


const addTodos = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body)
    try{
            const body = req.body as Pick<ITodo, "name" | "description" | "status">;
            const todo: ITodo = new Todo({
                name: body.name,
                description: body.description,
                status: body.status
            })

            const newTodo: ITodo = await todo.save()
            const allTodos: ITodo[] = await Todo.find()

            
            res.status(200).json({
                success: true,
                data: allTodos
            });

    }catch (error){
        console.log(error)
        res.status(404).json({
            success: false,
            error
        });
    }
}

const updateTodo = async (req:Request, res:Response): Promise<void> => {
    try{

        const {
            params: { id },
            body
        } = req

        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            {_id: id},
            body
        )

        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
          })

    }catch (error) {
        res.status(404).json({
            success: false,
            error
        });
    }
}


const deleteTodo = async (req:Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            error
        });
    }
}


export { getTodos, addTodos, updateTodo, deleteTodo }