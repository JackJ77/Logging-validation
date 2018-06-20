import React, { Component } from 'react';
import './App.css';
import authCheck from './../utilities/authCheck';
import MessageBox from './../MessageBox/MessageBox';

const validationStyle = {
  display: 'block',
  color: 'red',
  marginBottom: '5px',
  marginTop: '-7px'
};

class App extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    messageEmail: ''
  }

  componentDidMount() {
    this.regEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.regPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.{6,})/;
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    if ((e.target.name === 'email')&&(!this.regEmail.test(e.target.value))) {
       this.setState({messageEmail: 'invalid email'});
    } else if ((e.target.name === 'password')&&(!this.regPassword.test(e.target.value))) {
       this.setState({message: 'invalid password'});
    } else if (this.regPassword.test(e.target.value)){
      this.setState({message: ''});
    } else {
      this.setState({messageEmail: ''});
    }
  }

  handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }

    if (this.regEmail.test(this.state.email) && this.regPassword.test(this.state.password)) {
      authCheck(this.state.email, this.state.password)
        .then(res => {
          console.log(res);
          this.setState({message: 'login successful'});
        }).catch(err => {
          console.log(err);
          this.setState({message: 'invalid email or password'});
        });
    }
  }

  render() {
    return (
        <div>
          {this.state.message === 'login successful' ? <MessageBox style={{style: 'success'}} message={this.state.message} /> :
          <form onSubmit={this.handleSubmit} className="App">
              <label htmlFor="email">Email</label>
              <input
                placeholder="test@test.pl"
                value={this.state.email}
                onChange={ this.onInputChange }
                type="text"
                name="email"
                id="email" />
                {(this.state.messageEmail === 'invalid email') ? <small style={validationStyle}>{this.state.messageEmail}</small> : null}
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password1"
                value={this.state.password}
                onChange={ this.onInputChange }
                type="password"
                name="password"
                id="password" />
                {(this.state.message !== 'invalid email') ? <small style={validationStyle}>{this.state.message}</small> : null}
              <label className="container" htmlFor="remember">Remember me</label>
              <input type="checkbox" name="remember" id="remember" />
              <button type="submit">Login</button>
          </form>}
        </div>
    );
  }
}

export default App;
