import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import validate from '../validation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <MuiThemeProvider>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </MuiThemeProvider>
);

const LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="email" component={renderTextField} label="Email" />
        <Field name="password" component={renderTextField} label="Password" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Login</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
})(LoginForm);
