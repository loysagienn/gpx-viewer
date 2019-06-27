/** @jsx createElement */

import {createElement} from 'react';
import {ROUTES_IDS, getUrlByRoute} from 'router';
import {SvgMenu} from '../Svg';
import Popup from '../Popup';
import css from './AthleteHeader.styl';


const unauthorize = () => window.location.assign(getUrlByRoute({id: ROUTES_IDS.STRAVA_UNAUTH}));

const MenuBtn = () => (
    <div className={css.menuBtn} tabIndex="0">
        <SvgMenu className={css.menuBtnSvg}/>
        <Popup className={css.popup}>
            <div className={css.menuItem}>
                Мои подписки
            </div>
            <div
                onClick={unauthorize}
                className={css.menuItem}
            >
                Выйти
            </div>
        </Popup>
    </div>
);


export default MenuBtn;
