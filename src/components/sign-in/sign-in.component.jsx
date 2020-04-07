import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button//custom-button.component";
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.action";
import { connect } from "react-redux";

export class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    // } catch (error) {
    //   console.log(error);
    // }
    //   this.setState({ email: "", password: "" });
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          {/* <label>Email</label> */}
          <FormInput
            label='Email'
            type='email'
            name='email'
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          {/* <label>Password</label> */}
          <FormInput
            label='Password'
            type='password'
            name='password'
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton
              type='button'
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              {" "}
              Sign In with Google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
