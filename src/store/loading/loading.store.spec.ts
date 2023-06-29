import { createAction } from "@ngrx/store";
import { LoadingState } from "./LoadingState";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";

describe('Loading store', () => {
  it('show', () => {
    const initialState: LoadingState = {show: false}
    const newState = loadingReducer(initialState, show())

    expect(newState).toEqual({show: true});
  });

  it('hide', () => {
    const initialState: LoadingState = {show: true}
    const newState = loadingReducer(initialState, hide())

    expect(newState).toEqual({show: false});
  });

  it('should keep state if action is unknown', () => {
    const initialState: LoadingState = {show: true};
    const unknownAction = createAction('[loading] unknown');
    const newState = loadingReducer(initialState, unknownAction());

    expect(newState).toEqual(initialState);
  });
});