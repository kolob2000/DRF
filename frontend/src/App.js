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
import ProjectEditForm from "./component/ProjectEditForm";
import CreateProjectForm from "./component/CreateProjectForm";
import CreateNoteForm from "./component/CreateNoteForm";

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
        axios.get('http://5.63.157.103:8000/api/users/', {headers})
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

        axios.get('http://5.63.157.103:8000/api/notes/', {headers})
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
        axios.get('http://5.63.157.103:8000/api/projects/', {headers})
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
        axios.post('http://5.63.157.103:8000/api-token-auth/', {'username': username, 'password': password}
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

    deleteNote(id) {
        const headers = this.get_headers();
        axios.delete(`http://5.63.157.103:8000/api/notes/${id}`, {headers: headers})
            .then(response => {
                console.log(response.status)
                this.loadData();
            })
            .catch(err => console.log(err))
    }

    deleteProject(id) {
        const headers = this.get_headers();
        axios.delete(`http://5.63.157.103:8000/api/projects/${id}`, {headers: headers})
            .then(response => {
                this.loadData();
            })
            .catch(err => console.log(err))
    }

    editProject(id, title, url) {
        const headers = this.get_headers();
        const data = {'title': title, 'url_repo': url}
        axios.patch(`http://5.63.157.103:8000/api/projects/${id}/`, data, {headers: headers})
            .then(response => {
                this.loadData();
            })
            .catch(err => console.log(err))
    }

    createProject(title, url, user_list) {
        const headers = this.get_headers();
        const data = {'title': title, 'url_repo': url, 'user_list': user_list}
        axios.post(`http://5.63.157.103:8000/api/projects/`, data, {headers: headers})
            .then(response => {
                this.loadData();
            })
            .catch(err => console.log(err))
    }

    createNote(title, project) {
        console.log(this.state.users.find((user) => user.username === this.current_user()).id)
        const headers = this.get_headers();
        const data = {
            'title': title,
            'project': project,
            'active': true,
            'create_by_user': this.state.users.find((user) => user.username === this.current_user()).id
        }
        console.log(data)
        axios.post(`http://5.63.157.103:8000/api/notes/`, data, {headers: headers})
            .then(response => {
                this.loadData();
            })
            .catch(err => console.log(err))
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
                        <Redirect from={'/logout'} to={'/login'}/>
                        <Redirect from={'/in'} to={'/'}/>
                        <Route exact path='/projects'
                               component={() => <ProjectList projects={this.state.projects}
                                                             deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/:id'
                               component={() => <ProjectDetail projects={this.state.projects}
                                                               users={this.state.users}/>}/>
                        <Route exact path='/project-edit/:id'
                               component={() => <ProjectEditForm
                                   editProject={(id, title, url) => this.editProject(id, title, url)}/>}/>
                        <Route exact path='/project-create'
                               component={() => <CreateProjectForm
                                   createProject={(title, url, user_list) => this.createProject(title, url, user_list)}
                                   users={this.state.users}/>}/>
                        <Route exact path='/note-create'
                               component={() => <CreateNoteForm
                                   createNote={(title, project) => this.createNote(title, project)}
                                   projects={this.state.projects}/>}/>

                        <Route exact path='/todo'
                               component={() => <TodoList todos={this.state.todos} projects={this.state.projects}
                                                          deleteNote={(id) => this.deleteNote(id)}/>}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </div>
    }
}

export default App;
