import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLessons } from 'api';
import { HYDRATE } from 'next-redux-wrapper';
import { AppThunk, ILesson } from 'types';

interface IScheduleState {
    lessons: ILesson[];
}

const initialState: IScheduleState = {
    lessons: []
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setLessons: (store, action: PayloadAction<ILesson[]>) => {
            store.lessons = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return state = {
                ...state,
                ...action.payload.schedule
            }
        }
    }
});

export const { setLessons } = scheduleSlice.actions;

export default scheduleSlice.reducer;

export const prepareLessons = (group: string): AppThunk => {
    return async (dispatch) => {
        const lessons = await getLessons(group);

        dispatch(setLessons(lessons));
    }
}
