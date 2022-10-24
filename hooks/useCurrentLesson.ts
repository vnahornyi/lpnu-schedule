import { useEffect, useRef } from 'react';

const useCurrentLesson = (start: string, end: string, day: number): boolean => {
    const currentDate = useRef(new Date());
    const startTime = +start.replace(':', '.');
    const endTime = +end.replace(':', '.');
    const currentDay = currentDate.current.getDay() === 0 ? 7 : currentDate.current.getDay();
    const currentTime = +`${currentDate.current.getHours()}.${currentDate.current.getMinutes()}`;

    useEffect(() => {
        const interval = setInterval(() => {
            currentDate.current = new Date();
        }, 3600);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return currentTime >= startTime && currentTime < endTime && day === currentDay;
}

export default useCurrentLesson;
