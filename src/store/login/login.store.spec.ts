import { User } from "src/app/model/user/User";
import { AppInitialState } from "../AppInitialState";
import { LoginState } from "./LoginState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";

describe('Login store', () => {
  it('recoverPassword ', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, recoverPassword())

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    });
  })

  it('recoverPasswordSuccess ', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, recoverPasswordSuccess())

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    });
  })

  it('recoverPasswordFail', () => {
    const initialState: LoginState = AppInitialState.login;
    const error = { error: 'error' };
    const newState = loginReducer(initialState, recoverPasswordFail({ error }))

    expect(newState).toEqual({
      ...initialState,
      error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    });
  })

  it('login', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, login());

    expect(newState).toEqual({
      ...initialState,
      isLoggingIn: true
    })
  })

  it('login success', () => {
    const initialState: LoginState = AppInitialState.login;
    const user = new User();
    user.email = 'user@email.com';
    user.id = 'id1';
    const newState = loginReducer(initialState, loginSuccess({ user }));

    expect(newState).toEqual({
      ...initialState,
      isLoggedIn: true,
    })
  })

  it('login fail', () => {
    const initialState: LoginState = AppInitialState.login;
    const error = 'Current user already exists';
    const newState = loginReducer(initialState, loginFail({ error }));

    expect(newState).toEqual({
      ...initialState,
      error,
    })
  })
})