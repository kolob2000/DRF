import React from "react";

const TodoItem = ({todo, projects}) => {
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
        </tr>
    )
}

const TodoList = ({todos, projects}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Назввние</th>
                <th scope="col">Проект</th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => <TodoItem todo={todo} projects={projects}/>)}
            </tbody>
        </table>
    )
}

export default TodoList;