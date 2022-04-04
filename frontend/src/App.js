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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import axios from "axios";
import ProjectDetail from "./component/ProjectDetail";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'todos': [],
            'projects': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/v1/users/')
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/v1/notes/')
            .then(response => {
                const todos = response.data.results;
                this.setState(
                    {
                        'todos': todos,
                    }
                )

            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/v1/projects/')
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        'projects': projects,
                    }
                )
            }).catch(error => console.log(error));
    }

    render() {
        return <div className="main">
            <Router>
                <Header/>
                <div className="container content-container">
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/projects/:id'
                               component={() => <ProjectDetail projects={this.state.projects} users={this.state.users}/>}/>
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
