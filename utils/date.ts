const LVIV_TIMEZONE = 'Europe/Uzhgorod';

export function getCurrentUADate() {
    const offset = new Date().getTimezoneOffset() * 60000;
    const date = new Date(Date.now() + offset + getTimezoneOffset(LVIV_TIMEZONE));
    return date;
}

export const getTimezoneOffset = (timeZone: string, date = new Date()) => {
    const tz = date.toLocaleString('en', { timeZone, timeStyle: 'long' }).split(' ').slice(-1)[0];
    const utc = date.toUTCString();
    const dateString = utc.substring(0,utc.length - 4);
    const offset = Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);

    return offset;
}

export function getHours(num: number) {
    switch (num) {
        case 1:
            return ["8:30", "10:05"];
        case 2:
            return ["10:20", "11:55"];
        case 3:
            return ["12:10", "13:45"];
        case 4:
            return ["14:15", "15:50"];
        case 5:
            return ["16:00", "17:35"];
        case 6:
            return ["17:40", "19:15"];
        case 7:
            return ["19:20", "20:55"];
        case 8:
            return ["21:00", "22:35"];
        default:
            return ["", ""];
    }
}

