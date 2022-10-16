import { ThunkAction, Action } from '@reduxjs/toolkit';
import { makeStore } from 'store';

export interface IInstituteAndGroups {
    institute: string;
    groups: string[];
}

export interface ILesson {
    day: number;
    number: number;
    subject: string;
    lecturer: string;
    location: string;
    urls: string[];
    isFirstWeek: boolean;
    isSecondWeek: boolean;
    isFirstSubgroup: boolean;
    isSecondSubgroup: boolean;
    type: string;
}

export interface ITimetable {
    day: number;
    position: number;
    lesson: ILesson;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
