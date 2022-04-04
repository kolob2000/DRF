import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td><Link to={`projects/${project.id}`}>{project.title}</Link></td>
            <td>{project.url_repo ? <a href={project.url_repo} target={"_blank"}>Репозиторий</a> : 'Отсутствует'}</td>

        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Название</th>
                <th scope="col">Адрес</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList