import BaseComponent from '~/base/component';

const PASSWORD_FIELD = '#user_password';
const CONFIRMATION_PASSWORD_FIELD = '#user_password_confirmation';
const SUBMIT_BUTTON = '#submit_btn';

// UsersPasswordForm component that handles user password form
// interactions.
class UsersSignUpForm extends BaseComponent {
  elements() {
    this.$Password = this.$el.find(PASSWORD_FIELD);
    this.$PasswordConfirmation = this.$el.find(CONFIRMATION_PASSWORD_FIELD);
    this.$submit = this.$el.find(SUBMIT_BUTTON);
  }

  events() {
    this.$el.on('keyup', PASSWORD_FIELD, e => this.onKeyup(e));
    this.$el.on('keyup', CONFIRMATION_PASSWORD_FIELD, e => this.onKeyup(e));
  }

  onKeyup() {
    const Password = this.$Password.val();
    const PasswordConfirmation = this.$PasswordConfirmation.val();
    const PasswordInvalid = !Password;
    const PasswordConfirmationInvalid = !PasswordConfirmation ||
      Password !== PasswordConfirmation;

    if (PasswordInvalid || PasswordConfirmationInvalid) {
      this.$submit.attr('disabled', 'disabled');
    } else {
      this.$submit.removeAttr('disabled');
    }
  }
}

export default UsersSignUpForm;
