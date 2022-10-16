import axios from 'axios';
import { IInstituteAndGroups, ILesson } from 'types';

const API_PREFIX = 'https://nulp-schedule-backend.vercel.app/api';

export const getInstitutes = async (): Promise<IInstituteAndGroups[]> => {
    const institutes = await axios.get(`${API_PREFIX}/institutes`);

    return institutes.data;
}

export const getLessons = async (group: string): Promise<ILesson[]> => {
    const lessons = await axios.get(`${API_PREFIX}/lessons/${group}`);

    return lessons.data;
}
