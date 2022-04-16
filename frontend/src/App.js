import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css';
import React from 'react'
import TodoList from "./component/Note";
import UserList from "./component/User";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ProjectList from "./component/Project";
import PageNotFound from "./component/NotFound";
import LoginForm from "./component/LoginForm";
import Cookies from "universal-cookie/es6";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams, Redirect, useHistory,
} from "react-router-dom";
import axios from "axios";
import ProjectDetail from "./component/ProjectDetail";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todos': [],
            'projects': [],
            'token': [],
            'current_user': [],
        }
    }

    setToken(token) {
        const cookies = new Cookies();
        cookies.set('token', token);
        this.setState({
                'token': token,
            },
            () => this.loadData()
        );
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        headers['Authorization'] = 'Token ' + this.state.token;
        return headers
    }

    isAuthenticated() {
        return this.state.token != '';

    }

    loadData() {
        let headers = this.get_headers();
        // console.log(headers)
        axios.get('http://127.0.0.1:8000/api/v1/users/', {headers})
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({users: []})
        });

        axios.get('http://127.0.0.1:8000/api/v1/notes/', {headers})
            .then(response => {
                const todos = response.data.results;
                this.setState(
                    {
                        'todos': todos,
                    }
                )

            }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        });
        axios.get('http://127.0.0.1:8000/api/v1/projects/', {headers})
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({projects: []});
        });
    }


    getTokenFromStorage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        this.setState({
                'token': token,
            },
            () => this.loadData()
        );
    }

    logout() {
        this.setToken('');
        let cookies = new Cookies();
        cookies.set('current_user', '');


    }


    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {'username': username, 'password': password}
        )
            .then(response => {
                this.setState({
                    'current_user': username,
                })
                let cookies = new Cookies();
                cookies.set('current_user', username);
                this.setToken(response.data.token);
            })
            .catch(err => {
                console.log(err);
            })
    }

    current_user() {
        let cookies = new Cookies();
        return cookies.get('current_user');
    }

    componentDidMount() {
        this.getTokenFromStorage();
        this.current_user();

    }

    render() {
        return <div className="main">
            <Router>
                <Header isAuthenticated={() => this.isAuthenticated()} logout={() => this.logout()}
                        current_user={() => this.current_user()}/>
                <div className="container content-container">
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/login'
                               component={() => <LoginForm
                                   getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Redirect from={'/logout'} to={'/'}/>
                        <Redirect from={'/in'} to={'/'}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/projects/:id'
                               component={() => <ProjectDetail projects={this.state.projects}
                                                               users={this.state.users}/>}/>
                        <Route exact path='/todo'
                               component={() => <TodoList todos={this.state.todos} projects={this.state.projects}/>}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </div>
    }
}

export default App;
