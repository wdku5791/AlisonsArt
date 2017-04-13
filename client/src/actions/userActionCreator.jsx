export function logInSuccess(username) {
  return {
    type: 'LOGIN_SUCCESS',
    username: username
  };
}