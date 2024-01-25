import html from "./app.html?raw";
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending  } from "./use-cases";

const ElementIDs = {
    ClearCompleted:'.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'

}



/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(ElementIDs.TodoList, todos)
        updatePendingCount()

    }

    const updatePendingCount = () =>{

        renderPending(ElementIDs.PendingCountLabel)
    }

    (() => {
        const app = document.createElement('div')
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos()
    })();

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput)
    const todoListUl = document.querySelector(ElementIDs.TodoList)
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters)
    const btnDeleteCompleted = document.querySelector(ElementIDs.ClearCompleted)

    newDescriptionInput.addEventListener('keyup', (e) => {

        if (e.keyCode !== 13) return
        if (e.target.value.trim().length === 0) return

        todoStore.addTodo(e.target.value)
        displayTodos()
        e.target.value = ''
    })

    todoListUl.addEventListener('click', (event) => {
        const element = (event.target.closest('[data-id]'))

        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos()
    })

    todoListUl.addEventListener('click', (event) => {
        if (event.target.className === 'destroy') {
            const element = (event.target.closest('[data-id]'))
            todoStore.deleteTodo(element.getAttribute('data-id'))
            displayTodos()
        }

    })

    btnDeleteCompleted.addEventListener('click', ()=>{
        todoStore.deleteCompleted()
        displayTodos()
    })

    filtersLi.forEach(filter => {
        filter.addEventListener('click', (element) => {
            filtersLi.forEach(el => el.classList.remove('selected'))
            element.target.classList.add('selected')

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            };
            displayTodos()

        })
    })

}