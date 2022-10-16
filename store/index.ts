import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { AppStore } from 'types';
import settingsReducer from './settings';
import scheduleReducer from './schedule';

export const makeStore = () => {
    return configureStore({
        reducer: {
            settings: settingsReducer,
            schedule: scheduleReducer
        },
        devTools: process.env.NODE_ENV === 'development'
    });
}

export const wrapper = createWrapper<AppStore>(makeStore);
