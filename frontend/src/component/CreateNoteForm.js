import React from "react";
import {withRouter} from "react-router-dom";


class CreateNoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            project: '',
        }
    }

    handleChange(event) {
        console.log(event.target.name)
        console.log(this.state)
        this.setState({
            [event.target.tagName !== 'SELECT' ? event.target.name : 'project']: event.target.value,
        })
    }

    handleSubmit(event) {
        this.props.createNote(this.state.title, this.state.project);
        this.props.history.push('/todo')
        event.preventDefault();
    }

    render() {
        return (
            <form className="login-form col-6" onSubmit={event => this.handleSubmit(event)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Название: </label>
                    <input value={this.state.title} type="text" onChange={event => this.handleChange(event)}
                           className="form-control" id="title"
                           aria-describedby="emailHelp" name="title"/>
                </div>

                <div className="mb-3">
                    <select onChange={event => this.handleChange(event)} className="form-select"
                            aria-label="Default select example">
                        <option defaultValue={true}>Выберите автора(ов) проекта</option>
                        {this.props.projects.map((project) =>
                            <option key={project.id} value={project.id}>{project.title}</option>
                        )}

                    </select>
                </div>
                <button type="submit" className="btn btn-outline-dark me-4">Создать</button>
            </form>
        )
    }
}

export default withRouter(CreateNoteForm);