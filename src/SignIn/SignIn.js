import React from 'react';

class SignInForm extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      defaultHomeserver: 'https://accounts.shuttlecraft.com',
	  homeserver: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

 handleSubmit(event) {
	 if ( this.state.homeserver === '' ){
		 this.setState({
			 ["homeserver"]: this.state.defaultHomeserver,
		 });
	 }
	let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
	"username": this.state.username,
	"password": this.state.password
});

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};

fetch("http://localhost:7000/index.html", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    event.preventDefault();
  }

  render() {
    return (
		<div>
		  <form className="formWrap" onSubmit={this.handleSubmit}>
			<div className="formGroup">
				<h1>Sign In</h1>
			</div>
			<div className="formGroup">
				<label className="label">
				Username:
				</label>
				<input
					required={true}
					autoFocus={true}
					autoComplete="username"
					name="username"            
					type="text"
					placeholder="Username"
					value={this.state.username}
					onChange={this.handleInputChange} />
			</div>
			<div className="formGroup">
				<label className="label">
				Password:
				</label>
				<input
					required={true}
					autoComplete="current-password"
					name="password"            
					placeholder="Password"
					type="password"
					value={this.state.password}
					onChange={this.handleInputChange} />
			</div>
			<div className="formGroup">
				<label className="label">
				Homeserver URL
				</label>
				<input
					required={false}
					autoComplete="current-password"
					name="homeserver"            
					placeholder={this.state.defaultHomeserver}
					type="url"
					value={this.state.homeserver}
					onChange={this.handleInputChange} />
			</div>

			<div className="formGroup">

				 <input className="btn" type="submit" value="Submit" />
			</div>
		  </form>
		</div>
    );
  }
	}


export default SignInForm;
