/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILesson } from 'types';
import { getCurrentUADate } from './date';

export function timeToDate(time: string) {
    const date = getCurrentUADate();
    const [hours, minutes] = time.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes)
    date.setSeconds(0);
    return date;
}

export function getWeekday(number: number) {
    switch (number) {
        case 1:
            return 'Понеділок';
        case 2:
            return 'Вівторок';
        case 3:
            return 'Середа';
        case 4:
            return 'Четвер';
        case 5:
            return 'П\'ятниця';
        case 6:
            return 'Субота';
        case 7:
            return 'Неділя';
        default:
            return 'Не вдалося отримати день'
    }
}

export function getHours(num: number) {
    switch (num) {
        case 1:
            return ['8:30', '10:05'];
        case 2:
            return ['10:20', '11:55'];
        case 3:
            return ['12:10', '13:45'];
        case 4:
            return ['14:15', '15:50'];
        case 5:
            return ['16:00', '17:35'];
        case 6:
            return ['17:40', '19:15'];
        case 7:
            return ['19:20', '20:55'];
        case 8:
            return ['21:00', '22:35'];
        default:
            return ['', ''];
    }
}

export function findSize(elements: Array<{ day: number, position: number }>) {
    let days = 5;
    let rows = 5;
    for (const element of elements) {
        if (element.day > days) days = element.day;
        if (element.position > rows) rows = element.position;
    }
    return {
        days: Math.min(days, 7),
        rows
    }
}

export function getActiveLesson() {
    const date = getCurrentUADate();
    let currentDay = date.getDay();

    if (currentDay === 0) currentDay = 7;

    let prevEnd = null;

    for (let i = 1; i < 9; i++) {
        const endH = getHours(i)[1];
        const end = timeToDate(endH);

        if (date < end && (!prevEnd || date > prevEnd)) {
            return {
                day: currentDay,
                num: i
            }
        }

        prevEnd = end;
    }

    return {
        day: -1,
        num: -1
    }
}

export function getWeek() {
    const date = getCurrentUADate();
    date.setHours(0, 0, 0, 0);

    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

    const week1 = new Date(date.getFullYear(), 0, 4);

    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 -
        3 + (week1.getDay() + 6) % 7) / 7);
}

export function testWeek(lesson: ILesson, week: number) {
    if (week === 1 && lesson.isFirstWeek) return true;
    if (week === 2 && lesson.isSecondWeek) return true;
    return false;
}

export function testSubgroup(lesson: ILesson, subgroup: number) {
    return (subgroup === 1 && lesson.isFirstSubgroup) ||
        (subgroup === 2 && lesson.isSecondSubgroup);
}

export function setSettingsToCookies(group: string, subGroup: number, institute: string) {
    localStorage.setItem('group', translit(group));
    localStorage.setItem('subgroup', subGroup.toString());
    localStorage.setItem('institute', translit(institute));
}

export function getSettingsFromCookies() {
    const group = translit(localStorage.getItem('group') as string ?? '', true);
    const subGroup = localStorage.getItem('subgroup') ?? null;
    const institute = translit(localStorage.getItem('institute') as string ?? '', true);

    return { group, subGroup, institute };
}

export function translit(str: string, reverse = false): string {
	let alph: any = {' ':' ','а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'g', 'з': 'z','і': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p','р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'и': 'y', 'э': 'e', 'А': 'A','Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'G', 'З': 'Z', 'І': 'I','Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R','С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'И': 'Y', 'х': 'h','ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'iu', 'я': 'ia', 'Х': 'H', 'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ь': '','Ю': 'IU', 'Я': 'IA', 'Ї': 'JI', 'ї': 'ji', 'Є': 'IE', 'є': 'ie', '-': '-', '_': '_', '(': '(', ')': ')', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0'};

	if (reverse) {
		const alphRev: any = {};

		for (const [key, value] of Object.entries(alph)) {
			alphRev[value as any] = key;
		}

		alph = { ...alphRev };
	}

	return str.split("").map(item => {
		return alph[item];
	}).join("");
}
