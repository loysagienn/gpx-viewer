/** @jsx createElement */

import {createElement} from 'react';
import Button from '../Button';
import {STRAVA_CLIENT_ID} from '../../../config';
import css from './StravaAuth.styl';

const appUrl = 'http://localhost:3000/auth';

const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${appUrl}&response_type=code&scope=read,read_all,profile:read_all,activity:read,activity:read_all`;

const StravaAuth = () => (
    <div className={css.stravaAuth}>
        <div className={css.block}>
            <Button
                className={css.loginBtn}
                href={authUrl}
            >
                Войти в Strava
            </Button>
        </div>
    </div>
);

export default StravaAuth;
