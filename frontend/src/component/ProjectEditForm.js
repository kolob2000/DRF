import React from "react";
import {withRouter} from "react-router-dom";


class ProjectEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        const {id} = this.props.match.params;
        const prop = this.props;
        this.props.editProject(id, this.state.title, this.state.url);
        this.props.history.push('/projects')
        console.log(id)
        console.log(prop)
        console.log('hello');
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
                    <label htmlFor="url" className="form-label">Адрес:</label>
                    <input name="url" value={this.state.url} onChange={event => this.handleChange(event)}
                           type="text"
                           className="form-control"
                           id="url"/>
                </div>
                <button type="submit" className="btn btn-outline-dark me-4">Изменить</button>
            </form>
        )
    }
}

export default withRouter(ProjectEditForm);