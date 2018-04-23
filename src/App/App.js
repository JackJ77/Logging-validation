import React, { Component } from 'react';
import './App.css';
import authCheck from './../utilities/authCheck';
import MessageBox from './../MessageBox/MessageBox';

const style = {
  success: {
    backgroundColor: '#bdffb5',
    color: '#468840',
    borderLeft: '2px solid #468840'
  },
  warning: {
    backgroundColor: '#ffe649',
    color: '#887002',
    borderLeft: '2px solid #887002'
  }
}

class App extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    style: {}
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }
    const regEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.{6,})/;

    if (regEmail.test(this.state.email) && regPassword.test(this.state.password)) {
      let valid = authCheck(this.state.email, this.state.password);
      if (valid) {
        this.setState({message: 'login successful', style: style.success});
      } else {
        this.setState({message: 'invalid email or password',  style: style.warning});
      }
    } else if (!regEmail.test(this.state.email)) {
      this.setState({message: 'invalid email', style: style.warning});
    } else if (!regPassword.test(this.state.password)) {
      this.setState({message: 'invalid password', style: style.warning});
    }
  }

  render() {
    return (
        <div>
          {this.state.message === 'login successful' ? null :
          <form onSubmit={this.handleSubmit} className="App">
              <label htmlFor="email">Email</label>
              <input value={this.state.email}
                    onChange={ this.onInputChange }
                    type="text"
                    name="email"
                    id="email" />
              <label htmlFor="password">Password</label>
              <input value={this.state.password}
                    onChange={ this.onInputChange }
                    type="password"
                    name="password"
                    id="password" />
              <label className="container" htmlFor="remember">Remember me</label>
              <input type="checkbox" name="remember" id="remember" />
              <button type="submit">Login</button>
          </form>}
          {this.state.message ? <MessageBox style={this.state.style} message={this.state.message} /> : null}
        </div>
    );
  }
}

export default App;
