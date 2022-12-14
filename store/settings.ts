import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import parser from 'lib/utils';
import { HYDRATE } from 'next-redux-wrapper';
import { AppThunk, IInstituteAndGroups } from 'types';
import { getSettingsFromLocalStorage } from 'utils';

interface ISettingsState {
    institutes: IInstituteAndGroups[];
    selectedGroup: string | null;
    selectedInstitute: string | null;
    subGroup: number;
    isPrepared: boolean;
    serverSubGroup: number | null;
    serverGroup: string | null;
    isConfirmed: boolean;
}

const initialState: ISettingsState = {
    institutes: [],
    selectedGroup: null,
    selectedInstitute: null,
    subGroup: 1,
    serverSubGroup: null,
    serverGroup: null,
    isPrepared: false,
    isConfirmed: false 
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setInstitutes: (store, action: PayloadAction<IInstituteAndGroups[]>) => {
            store.institutes = action.payload;
        },
        setSelectedInstitute: (store, action: PayloadAction<string>) => {
            store.selectedInstitute = action.payload;
        },
        setSelectedGroup: (store, action: PayloadAction<string>) => {
            store.selectedGroup = action.payload;
        },
        setServerStore: (store, action: PayloadAction<{ group: string, subgroup: number; }>) => {
            store.serverGroup = action.payload.group;
            store.serverSubGroup = action.payload.subgroup;
        },
        setSubgroup: (store, action: PayloadAction<number>) => {
            store.subGroup = action.payload;
        },
        setPrepared: (store, action: PayloadAction<boolean>) => {
            store.isPrepared = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            const newState = {
                ...state,
                ...action.payload.settings
            }

            if (state.isPrepared) newState.isPrepared = state.isPrepared;
            if (state.institutes.length > 0) newState.institutes = state.institutes;
            if (state.selectedGroup) newState.selectedGroup = state.selectedGroup;
            if (state.subGroup) newState.subGroup = state.subGroup;
            if (state.selectedInstitute) newState.selectedInstitute = state.selectedInstitute;

            return newState;
        }
    }
});
export const {
    setSelectedGroup,
    setInstitutes,
    setSelectedInstitute,
    setSubgroup,
    setPrepared,
    setServerStore
} = settingsSlice.actions;

export default settingsSlice.reducer;

export const prepareApp = (): AppThunk => {
    return async (dispatch) => {
        const { group, subGroup, institute } = getSettingsFromLocalStorage();

        dispatch(setSelectedGroup(typeof group === 'string' ? group : ''));
        dispatch(setSelectedInstitute(typeof institute === 'string' ? institute : ''));
        dispatch(setSubgroup(!Number.isNaN(subGroup) && subGroup !== null ? +subGroup : 1));
        dispatch(setPrepared(true));
    }
}

export const prepareInstitutes = (): AppThunk => {
    return async (dispatch) => {
        const data: IInstituteAndGroups[] = [];
        const institutes = await parser.getInstitutes();

        for await (const institute of institutes) {
            const groups = await parser.getGroups(institute);

            data.push({
                institute,
                groups
            });
        }

        dispatch(setInstitutes(data));
    }
}

