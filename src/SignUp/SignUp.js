import React from 'react';

class SignUpForm extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
	  passwordFirst: '',
	  passwordSecond: '',
	  email: '',
	  homeserver: '',
	  defaultHomeserver: 'https://accounts.shuttlecraft.io',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.validatePassword = this.validatePassword.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
	if (name === "passwordSecond"){
		if (this.validatePassword(value)){
			this.setState({
				[name]: value });
		}
	} else {
    this.setState({
      [name]: value    });
	}
  }

 validatePassword(value){
	return this.passwordFirst === value ? true : false ;
 }

isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
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
		"password": this.state.password,
	});

	if ( this.state.email !== '' && this.state.email !== ' '){
		raw["email"] = this.state.email
	}


	let requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	};

	fetch(this.state.homeserver, requestOptions)
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
				<h1>Sign Up</h1>
			</div>
			<div className="formGroup">
				<label className="label">
				Username:
				</label>
				<input
					autoFocus={true}
					autoComplete="username"
					placeholder="Username"
					name="username"            
					type="text"
					required={true}
					value={this.state.username}
					onChange={this.handleInputChange} />
			</div>
			<div className="formGroup newPassword">
				<label className="label">
				Password:
				</label>
				<input
					required={true}
					placeholder="Password"
					autoComplete="new-password"
					minLength="10"
					name="password"            type="password"
					value={this.state.passwordFirst}
					onChange={this.handleInputChange} />
			</div>
			<div className="formGroup newPassword">
				<label className="label">
				Retype password
				</label>
				<input
					required={true}
					autoComplete="new-password"
					placeholder="Re-enter password"	
					name="password"            type="password"
					value={this.state.passwordSecond}
					onChange={this.handleInputChange} />
			</div>
			<div className="formGroup">
				<label className="label">
				E-mail
				</label>
				<input
					required={false}
					autoComplete="email"
					name="email"
					placeholder="Optional"
					type="email"
					value={this.state.email}
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


export default SignUpForm;
