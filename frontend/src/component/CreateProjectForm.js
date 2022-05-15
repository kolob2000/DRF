import React from "react";
import {withRouter} from "react-router-dom";


class CreateProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            user_list: [],
        }
    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleChangeSelected(event) {
        let user_list = [];
        for (let i of event.target.options) {
            if (i.selected) {
                user_list.push(i.value);
            }
        }
        this.setState({
            user_list: user_list,
        })
    }

    handleSubmit(event) {
        const prop = this.props;
        this.props.createProject(this.state.title, this.state.url, this.state.user_list);
        this.props.history.push('/projects')
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
                <div className="mb-3">
                    <select onChange={event => this.handleChangeSelected(event)} multiple className="form-select"
                            aria-label="Default select example">
                        <option selected>Выберите автора(ов) проекта</option>
                        {this.props.users.map((user) =>
                            <option value={user.id}>{user.username}</option>
                        )}

                    </select>
                </div>
                <button type="submit" className="btn btn-outline-dark me-4">Изменить</button>
            </form>
        )
    }
}

export default withRouter(CreateProjectForm);