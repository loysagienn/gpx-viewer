import {metrikaCounterId} from 'config';

// хитровыебанная инициализация яндекс метрики
window.ym = window.ym || ((...args) => {
    if (!window.ym.a) {
        window.ym.a = [];
    }

    window.ym.a.push(args);
});


const getAthlete = ({athlete}) => {
    if (!athlete) {
        return {
            id: null,
            username: null,
        };
    }

    const {id, username} = athlete;

    return {id, username};
};

export const initMetrika = (store) => {
    const {id: athleteId} = getAthlete(store.getState());

    const userParams = {};

    if (athleteId) {
        userParams.UserID = athleteId;
    }

    window.ym(metrikaCounterId, 'init', {
        clickmap: false,
        trackLinks: true,
        accurateTrackBounce: false,
        userParams,
    });
};
