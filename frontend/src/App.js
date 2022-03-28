import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css';
import React from 'react'
import UserList from "./component/User";
import Header from "./component/Header";
import Footer from "./component/Footer";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/v1/users/')
            .then(response => {
                const users = response.data;
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        // const users = [
        //     {
        //         'username': 'kollabiz',
        //         'first_name': 'Nick',
        //         'last_name': 'Shcherbakov',
        //         'email': 'k.kolabis@mail.ru',
        //     }
        // ]

    }

    render() {
        return <div className="main">
            <Header/>
            <div className="container content-container">
                <UserList users={this.state.users}/>
            </div>
            <Footer/>
        </div>
    }
}

export default App;
