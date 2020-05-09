import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  // step3: each functions "setState" values will transper to constructor's this.state.
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    };
  }
  /* send all info(form형식) to endpoint(backend), using by async.
  "handleSubmit" can connect to server using by multer.
  reference: 5.server.js
   data has to be sent as FormData.*/
  handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    // await fetch 는 정보를보내고,promise를 받아서 내가받을준비를한다.
    // await 를 쓰면 서버에서 promise라는 오브젝트를 프론트엔드에 보내준다.
    //그러면 ..나중에받는다라고하고 프론트앤드에서 대기하는도중에 다른일을함.

    let response = await fetch("/login", {
      method: "POST",
      body: data,
    });
    //그리고 서버에서 자료를 보내주면 await response.text() 이렇게받고
    let responseBody = await response.text();
    //그걸 JSON.parse해서 텍스트형태에서 자료형태로 변형. b/c 자료가 왔다갔다할때에는 텍스트형식으로만 할수있음.
    let body = JSON.parse(responseBody);
    //when user.password == pwd, login success.
    if (body.success) {
      alert("Login success");
      this.props.username(this.state.username);
      this.props.dispatch({ type: "login-success" });
    } else alert("fail");
    console.log(body);
  };
  // step2: deal with one parameter which has been passed by user's Username input from render.
  handleUsername = (event) => {
    let user = event.target.value;
    this.setState({ username: user });
  };
  // step2: deal with one parameter which has been passed by user's password input from render.
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  // step1: introduce redux with class and fill out return objects.
  // when user puts value for ID and pd,
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Market place</h1>
          <div>
            <input
              placeholder="Username"
              type="text"
              onChange={this.handleUsername}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              onChage={this.handlePassword}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

let Login = connect()(UnconnectedLogin);
export default Login;
