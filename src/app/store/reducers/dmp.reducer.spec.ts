import {dmpReducer} from './dmp.reducer';
import {initialDmpState} from '../states/dmp.state';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {dmpsLoaded, failedToLoadDmps, loadDmps} from '../actions/dmp.actions';
import {mockDmpList} from '../../mocks/dmp-list-mocks';

describe('DmpReducer', () => {
  it('should return failed loading state', () => {
    const state = dmpReducer(initialDmpState, failedToLoadDmps);

    expect(state.loaded).toBe(LoadingState.FAILED);
    expect(state.ids).toEqual(initialDmpState.ids);
    expect(state.entities).toEqual(initialDmpState.entities);
  });

  it('should return loading state', () => {
    const state = dmpReducer(initialDmpState, loadDmps(false));

    expect(state.loaded).toBe(LoadingState.LOADING);
    expect(state.ids).toEqual(initialDmpState.ids);
    expect(state.entities).toEqual(initialDmpState.entities);
  });

  it('should return loaded state', () => {
    const newState = {...initialDmpState};
    newState.loaded = LoadingState.LOADED;
    const state = dmpReducer(newState, loadDmps(true));

    expect(state.loaded).toBe(LoadingState.LOADED);
    expect(state.ids).toEqual(initialDmpState.ids);
    expect(state.entities).toEqual(initialDmpState.entities);
  });

  it('should return loaded dmps', () => {
    const state = dmpReducer(initialDmpState, dmpsLoaded({dmps: mockDmpList}));

    expect(state.loaded).toBe(LoadingState.LOADED);
    expect(state.ids).toEqual([1]);
    expect(state.entities).toEqual({1: mockDmpList[0]});
  });
});
