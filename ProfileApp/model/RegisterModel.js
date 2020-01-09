import { getIsUsernameValid } from "../api/Api";

class RegisterModelStatic {

  constructor() {
    this.username = '';
    this.description = '';
  }

  async getUserNameError() {
    if(this.username.length < 4) {
      return 'Username must be more than 3 characters long!';
    } else {
      try {
        const response = await getIsUsernameValid(this.username);

        if(response.data === true) {
          return '';
        } else {
          return 'This username is already taken. Try another one';
        }
      } catch(error) {
        console.log(error);
        return 'Error validating the username. Try again!'
      }
    }
    return '';
  }

}

export const RegisterModel = new RegisterModelStatic();