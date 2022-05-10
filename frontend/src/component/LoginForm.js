import React from "react";

import {withRouter} from "react-router-dom";


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login': '',
            'password': '',
            'check': ''
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        )
    }

    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password);
        this.props.history.push('/projects')
        event.preventDefault();
    }

    render() {
        return (
            <form className="login-form col-6" onSubmit={event => this.handleSubmit(event)}>
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">Логин: </label>
                    <input value={this.state.login} type="text" onChange={event => this.handleChange(event)}
                           className="form-control" id="login"
                           aria-describedby="emailHelp" name="login"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль:</label>
                    <input name="password" value={this.state.password} onChange={event => this.handleChange(event)}
                           type="password"
                           className="form-control"
                           id="password"/>
                </div>
                <div className="mb-3 form-check">
                    <input onChange={event => this.handleChange(event)} type="checkbox" className="form-check-input"
                           id="exampleCheck1" name='check'/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Запомнить меня</label>
                </div>
                <button type="submit" className="btn btn-outline-dark me-4">Войти</button>
                <button type="button" className="btn btn-warning">Регистрация</button>
            </form>
        );
    }
}

export default withRouter(LoginForm);