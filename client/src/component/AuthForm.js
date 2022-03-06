import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImg: ""
    };
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    const check = await this.props.onAuth(authType, this.state)
    if(check){
      this.props.history.push("/")
    }

  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, username, password, profileImg } = this.state;
    const { signUp, heading, buttonText,error,history,removeError } = this.props;
    if(error.message){
      history.listen(()=>{
        removeError()
      })
    }
    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {error.message && <div className="alert alert-danger">{error.message}</div> }
              <label htmlFor="email">E-mail</label>
              <input
                autoComplete="off"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                type="text"
                value={email}
              />
              <label htmlFor="password">Password</label>
              <input
                autoComplete="off"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
              {signUp && (
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    type="text"
                    value={username}
                  />
                  <label htmlFor="image-url">Image URL</label>
                  <input
                    autoComplete="off"
                    className="form-control"
                    id="image-url"
                    name="profileImg"
                    onChange={this.handleChange}
                    type="text"
                    value={profileImg}
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;