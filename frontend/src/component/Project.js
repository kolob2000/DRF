import React, {useState} from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`projects/${project.id}`}>{project.title}</Link></td>
            <td>{project.url_repo ?
                <a href={project.url_repo} target={"_blank"} rel={"noreferrer"}>Репозиторий</a> : 'Отсутствует'}</td>
            <td>
                <Link to={`project-edit/${project.id}`}
                      className="btn btn-warning me-2">Изменить
                </Link>
            </td>
            <td>
                <button type="button"
                        onClick={() => deleteProject(project.id)}
                        className="btn btn-danger me-2">Удалить
                </button>
            </td>
        </tr>

    )
}

const ProjectList = ({projects, deleteProject}) => {
    const [new_projects, setNew_projects] = useState(projects);

    function HandleSearchChange(event) {
        console.log(event.target.value);
        console.log(new_projects);
        setNew_projects(
            projects.filter(projects => projects.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
        );
    }

    return (
        <React.Fragment>
            <form className="col-3  mt-3 mb-3 mb-lg-0 me-lg-3">
                <input onChange={event => HandleSearchChange(event)} type="search"
                       className="form-control form-control-dark" placeholder="Поиск..."
                       aria-label="Search"/>
            </form>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Адрес</th>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {new_projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
                {/*{projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}*/}
                </tbody>
            </table>
            <Link to={`project-create`}
                  className="btn btn-dark me-2">Создать проект
            </Link>
        </React.Fragment>
    )
}

export default ProjectList