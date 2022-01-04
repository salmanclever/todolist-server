"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodos = exports.getTodos = void 0;
const todos_1 = __importDefault(require("../../models/todos"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todos_1.default.find();
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            error
        });
    }
});
exports.getTodos = getTodos;
const addTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const body = req.body;
        const todo = new todos_1.default({
            name: body.name,
            description: body.description,
            status: body.status
        });
        const newTodo = yield todo.save();
        const allTodos = yield todos_1.default.find();
        res.status(200).json({
            success: true,
            data: allTodos
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            error
        });
    }
});
exports.addTodos = addTodos;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const updateTodo = yield todos_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todos_1.default.find();
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            error
        });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todos_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todos_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            error
        });
    }
});
exports.deleteTodo = deleteTodo;
