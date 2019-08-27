/** @jsx createElement */

import {createElement} from 'react';
import {stringifyQueryParams} from 'helpers';
import {ROUTES_IDS, getUrlByRoute} from 'router';
import Button from '../Button';
import {STRAVA_CLIENT_ID} from 'config';
import css from './StravaAuth.styl';


const STRAVA_AUTHORIZE_URL = 'https://www.strava.com/oauth/authorize';

const scope = ['read', 'read_all', 'profile:read_all', 'activity:read', 'activity:read_all'];

const getAuthUrl = (origin) => {
    const callbackPath = getUrlByRoute({
        id: ROUTES_IDS.STRAVA_AUTH,
    });
    const query = stringifyQueryParams({
        client_id: STRAVA_CLIENT_ID,
        redirect_uri: `${origin}${callbackPath}`,
        response_type: 'code',
        scope: scope.join(','),
        state: 'default',
    });

    return `${STRAVA_AUTHORIZE_URL}?${query}`;
};

const getDemoUrl = () => getUrlByRoute({
    id: ROUTES_IDS.DEMO_LOGIN,
});

const StravaAuth = ({origin}) => (
    <div className={css.stravaAuth}>
        <div className={css.block}>
            <div className={css.textBlock}>
                На этом сайте можно помотреть календарь своих тренировок в Strava.
                В дальнейшем планируется добавить анализ тренировок, графики темпа, пульса и т.д.
            </div>
            <div className={css.textBlock}>
                Для работы нужен доступ к вашим тренировкам, либо можно посмотреть в демо режиме
            </div>
            <div className={css.btnWrapper}>
                <Button
                    className={css.loginBtn}
                    href={getAuthUrl(origin)}
                >
                    Мои тренировки в Strava
                </Button>
                <Button
                    className={css.demoBtn}
                    href={getDemoUrl()}
                    theme="white"
                >
                    Демо режим
                </Button>
            </div>
        </div>
    </div>
);

export default StravaAuth;
