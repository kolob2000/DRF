import React from "react";

const TodoItem = ({todo, projects, deleteNote}) => {
    let project_name = ''
    for (let i of projects) {
        if (i.id === todo.project) {
            project_name = i.title;
            break;
        }
    }
    return (
        <tr>
            <td>{todo.title}</td>
            <td>{project_name}</td>
            <td>
                <button onClick={() => deleteNote(todo.id)} type="button"
                        className="btn btn-danger me-2">Удалить
                </button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, projects, deleteNote}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Назввние</th>
                <th scope="col">Проект</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => !todo.active ? '' :
                <TodoItem todo={todo} projects={projects} deleteNote={deleteNote}/>)}
            </tbody>
        </table>
    )
}

export default TodoList;