import {LoadingState} from '../../domain/enum/loading-state.enum';
import {internalStorageReducer} from './internal-storage.reducer';
import {initialInternalStorageState} from '../states/internal-storage.state';
import {failedToLoadInternalStorages, internalStoragesLoaded, loadInternalStorages} from '../actions/internal-storage.actions';
import {mockInternalStorage} from '../../mocks/storage-mocks';
import {initialRepositoryState} from '../states/repository.state';

describe('StorageReducer', () => {
  it('should return failed loading state', () => {
    const state = internalStorageReducer(initialInternalStorageState, failedToLoadInternalStorages);

    expect(state.loaded).toBe(LoadingState.FAILED);
    expect(state.ids).toEqual(initialRepositoryState.ids);
    expect(state.entities).toEqual(initialInternalStorageState.entities);
  });

  it('should return loading state', () => {
    const state = internalStorageReducer(initialInternalStorageState, loadInternalStorages);

    expect(state.loaded).toBe(LoadingState.LOADING);
    expect(state.ids).toEqual(initialRepositoryState.ids);
    expect(state.entities).toEqual(initialInternalStorageState.entities);
  });

  it('should return loaded storages', () => {
    const state = internalStorageReducer(initialInternalStorageState, internalStoragesLoaded({internalStorages: [mockInternalStorage]}));

    expect(state.loaded).toBe(LoadingState.LOADED);
    expect(state.ids).toEqual([mockInternalStorage.id]);
    expect(state.entities).toEqual({'-1': mockInternalStorage});
  });
});
