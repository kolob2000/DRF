import React from "react";
import {useParams} from "react-router-dom";
import PageNotFound from "./NotFound";

const ProjectDetail = ({projects, users}) => {
    let {id} = useParams();
    if (!parseInt(id)) {
        return (< PageNotFound/>)
    }
    const project = projects.filter((item) => item.id === parseInt(id));
    if (project.length === 0) {
        return (< PageNotFound/>)
    }
    let user_list = []
    for (let i of project[0].user_list) {
        user_list.push(users.find(user => user.id === i).username)
    }
    console.log(user_list)

    return (
        <ul>
            <li>Название: {project[0].title}</li>
            <li>Репозиторий: {project[0].url_repo}</li>
            <li>Пользователи:
                <ul>
                    {user_list.map((item) => <li>{item}</li>)}
                </ul>
            </li>
        </ul>
    )
}

export default ProjectDetail;