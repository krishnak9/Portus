import BaseComponent from '~/base/component';

const PASSWORD_FIELD = '#user_password';
const USERNAME_FIELD = '#user_username';
const EMAIL_FIELD = '#user_email';
const CONFIRMATION_PASSWORD_FIELD = '#user_password_confirmation';
const SUBMIT_BUTTON = '#submit_btn';

// UsersPasswordForm component that handles user password form
// interactions.
class UsersSignUpForm extends BaseComponent {
  elements() {
    this.$password = this.$el.find(PASSWORD_FIELD);
    this.$passwordConfirmation = this.$el.find(CONFIRMATION_PASSWORD_FIELD);
    this.$username = this.$el.find(USERNAME_FIELD);
    this.$userEmail = this.$el.find(EMAIL_FIELD);
    this.$submit = this.$el.find(SUBMIT_BUTTON);
    this.$pass_valid = false;
    this.$pass_conf_valid = false;
    this.$username_valid = false;
    this.$email_valid = false;
  }

  events() {
    this.$el.on('ready', '#new_user', e => this.allvalidation(e));
    this.$el.on('keyup', PASSWORD_FIELD, e => this.onkeyuppassword(e));
    this.$el.on('keyup', CONFIRMATION_PASSWORD_FIELD, e => this.onkeyuppassword_conf(e));
    this.$el.on('keyup', USERNAME_FIELD, e => this.onkeyupusername(e));
    this.$el.on('keyup', EMAIL_FIELD, e => this.onkeyupemail(e));
  }

  onkeyupusername() {
    const usernameInvalid = !this.$username[0].validity.valid;

    if (usernameInvalid) {
      this.$username_valid = false;
    } else {
      this.$username_valid = true;
    }

    allvalidation();
  }

  onkeyupemail() {
    const emailInvalid = !this.$userEmail[0].validity.valid;

    if (emailInvalid) {
      this.$email_valid = false;
    } else {
      this.$email_valid = true;
    }

    allvalidation();
  }

  onkeyuppassword_conf() {
    const passwordConfirmationInvalid = !this.$passwordConfirmation.val() ||
      this.$password.val() !== this.$passwordConfirmation.val();

    if (passwordConfirmationInvalid) {
      this.$passwordConfirmation[0].setCustomValidity('Please enter same password as above');
      this.$pass_conf_valid = false;
    } else {
      this.$passwordConfirmation[0].setCustomValidity('');
      this.$pass_conf_valid = true;
    }

    allvalidation();
  }

  onkeyuppassword() {
    const passwordInvalid = !this.$password.val() || this.$password.val().length < 8;
    
    if (passwordInvalid) {
      this.$password[0].setCustomValidity('Password should be of at least 8 characters minimum.');
      this.$pass_valid = false;
    } else {
      this.$password[0].setCustomValidity('');
      this.$passwordConfirmation.attr('pattern', this.$password.val());
      this.$pass_valid = true;
    }

    allvalidation();
  }

  allvalidation() {
    if (this.$pass_valid || this.pass_conf_valid || this.$email_valid || this.$username_valid) {
      this.$submit.removeAttr('disabled');
    } else {
      this.$submit.attr('disabled', true);
    }
  }
}

export default UsersSignUpForm;
