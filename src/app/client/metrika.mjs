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
            id: 0,
            username: '',
        };
    }

    const {id, username} = athlete;

    return {id, username};
};

export const initMetrika = (store) => {
    const {id: athleteId, username: athleteUsername} = getAthlete(store.getState());

    window.ym(metrikaCounterId, 'init', {
        clickmap: false,
        trackLinks: true,
        accurateTrackBounce: false,
        userParams: {
            athleteId,
            athleteUsername,
        },
    });
};
