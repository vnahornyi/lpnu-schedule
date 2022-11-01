import axios from 'axios';
import { ILesson } from 'types';

const API_PREFIX = 'https://nulp-schedule-backend.vercel.app/api';

export const getInstitutes = async (): Promise<string[]> => {
    const institutes = await axios.get(`${API_PREFIX}/institutes`);

    return institutes.data;
}

export const getGroupsByInstitute = async (institute: string): Promise<string[]> => {
    const groups = await axios.get(`${API_PREFIX}/groups/${institute}`);

    return groups.data;
};

export const getAllGroups = async (): Promise<string[]> => {
    const groups = await axios.get(`${API_PREFIX}/groups`);

    return groups.data;
};

export const getLessons = async (group: string): Promise<ILesson[]> => {
    const lessons = await axios.get(`${API_PREFIX}/lessons/${group}`);

    return lessons.data;
}
