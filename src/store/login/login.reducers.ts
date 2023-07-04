import { createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, login, loginSuccess, loginFail } from "./login.actions";

export const initialState: LoginState = {
  error: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isRecoveredPassword: false,
  isRecoveringPassword: false,
}

const reducer = createReducer(
  initialState,
  on(recoverPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(recoverPasswordSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    };
  }),
  on(login, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    }
  }),
  on(loginSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false
    }
  }),
  on(loginFail, (currentState, { error }) => {
    return {
      ...currentState,
      error,
      isLoggedIn: false,
      isLoggingIn: false
    }
  }),

);

export function loginReducer(state: LoginState, action: any) {
  return reducer(state, action);
}