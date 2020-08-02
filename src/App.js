import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInForm from './SignIn/SignIn';
import SignUpForm from './SignUp/SignUp';

class App extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
		showSignIn: true,
		showSignup: false,
	}
	this.toggleForm = this.toggleForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleForm(event) {
		this.setState({
			["showSignup"]:!this.state.showSignup, 
			["showSignIn"]: !this.state.showSignIn,
		});
	  event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

 handleSubmit(event) {
    alert(
		'Credentials: '
		+this.state.username
		+ this.state.password);
	 console.log(this.state.username);
    event.preventDefault();
  }

  render() {
	  if (this.state.showSignIn) {
		return(<div className="container">
				<SignInForm/>
				<p className="toggleForm"> 
					Don't have an account? 
						 <button className="link" onClick={this.toggleForm}>
							&nbsp;Sign Up here!	
						 </button>
				</p>
			  </div>
	  );
	  }
	  else{
		return(<div className="container">
				<SignUpForm/>
				<p className="toggleForm"> 
					Already have an account? 
						 <button class="link" onClick={this.toggleForm}>
							&nbsp;Sign In here!	
						 </button>
				</p>
			  </div>
	  );

	  }
	}
}


export default App;
