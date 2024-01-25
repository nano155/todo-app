import { v4 as uuidv4 } from 'uuid';

export class Todo {



    constructor(descripcion) {

        this.id = uuidv4();
        this.descripcion = descripcion;
        this.done = false;
        this.createdAt = new Date();
    }
}