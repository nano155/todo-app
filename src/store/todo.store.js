import { Todo } from "../todos/models/todo.model";

const filter ={
    All : 'all',
    Completed : 'Completed',
    Pending : 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del infinito'),
    ],
    filter: filter.All
}

const initStore = () =>{

    console.log('InitStore 🥑');
}