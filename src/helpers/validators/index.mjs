
export const validateMonthKey = (monthKey) => {
    const [year, month] = monthKey.split('-').map(Number);

    const isMonthKeyInvalid = (
        (Number.isNaN(year) || Number.isNaN(month)) ||
        (year < 1 || year > 3000 || month < 0 || month > 11)
    );

    if (isMonthKeyInvalid) {
        throw new Error(`Invalid month key: ${monthKey}`);
    }

    return true;
};

export const validateMonthKeyAsync = async monthKey => validateMonthKey(monthKey);
