
export const INIT_YMAPS = 'INIT_YMAPS';

export const initYmaps = ymaps => ({
    type: 'INIT_YMAPS',
    ymaps,
});

export const CHANGE_MONTH = 'CHANGE_MONTH';

export const changeMonth = month => (dispatch, getState) => {
    const {activeMonth} = getState();

    if (activeMonth === month) {
        return;
    }

    dispatch({
        type: CHANGE_MONTH,
        month,
    });
};

export const PUSH_MONTH = 'PUSH_MONTH';

export const pushMonth = () => ({type: PUSH_MONTH});
