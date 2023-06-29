import { ActionType, createReducer, on } from "@ngrx/store";
import { show, hide } from "./loading.actions";
import { LoadingState } from "./LoadingState";
import { Action } from "rxjs/internal/scheduler/Action";

const reducer = createReducer(
  {},
  on(show, () => {
    return { show: true }
  }),
  on(hide, () => {
    return { show: false }
  })
);

export function loadingReducer(state: LoadingState, action: any) {
  return reducer(state, action)
}