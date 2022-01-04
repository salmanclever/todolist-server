"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
/**
* @swagger
* /todos:
*   get:
*     description: Returns all todos
*     responses:
*       '200':
*         description: A successful response
*/
router.get("/todos", todos_1.getTodos);
/**
* @swagger
* /add-todo:
*   post:
*     description: Creates a todo
*     requestBody:
*       description: todo object
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               description:
*                 type: string
*               status:
*                 type: boolean
*     responses:
*       '200':
*         description: A successful response
*/
router.post("/add-todo", todos_1.addTodos);
/**
* @swagger
* /edit-todo/{id}:
*  put:
*    summary: Updates a todo item.
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The id of the todo item to update.
*    requestBody:
*      description: todo object
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              name:
*                type: string
*              description:
*                type: string
*              status:
*                type: boolean
*    responses:
*      '200':
*        description: todo is Updated
*/
router.put("/edit-todo/:id", todos_1.updateTodo);
/**
* @swagger
* /delete-todo/{id}:
*  delete:
*    summary: Deletes a todo item.
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: todo id
*    responses:
*      '200':
*        description: todo is Deleted
*/
router.delete("/delete-todo/:id", todos_1.deleteTodo);
exports.default = router;
