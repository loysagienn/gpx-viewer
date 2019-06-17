
export const stringifyDateMonth = date => `${date.getFullYear()}-${date.getMonth()}`;

export const getDateFromMonth = (str) => {
    const [year, month] = str.split('-');

    return new Date(year, month);
};

export const stringifyDateDay = date => `${stringifyDateMonth(date)}-${date.getDate()}`;
