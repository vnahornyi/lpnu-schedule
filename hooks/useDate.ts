interface IDateProps {
    type: 'full' | 'small',
    day?: number;
}

const options = {
    full: {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    },
    small: {
        weekday: 'short',
        day: '2-digit'
    }
};

const useDate = (props: IDateProps): string => {
    const date = new Date();

    if (props.day) {
        date.setDate(date.getDate() + props.day);
    }

    return new Intl.DateTimeFormat('uk', options[props.type] as object).format(date);
}

export default useDate;
