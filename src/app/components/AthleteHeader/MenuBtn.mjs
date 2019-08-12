/** @jsx createElement */

import {createElement} from 'react';
import {withStateHandlers} from 'recompose';
import {ROUTES_IDS, getUrlByRoute} from 'router';
import {SvgMenu} from '../Svg';
import {Popup, PopupTarget} from '../Popup';
import css from './AthleteHeader.styl';


const MenuBtn = ({active, hide, toggle, isDemo}) => (
    <PopupTarget
        className={css.menuBtn}
        onClick={toggle}
    >
        <SvgMenu className={css.menuBtnSvg}/>
        <Popup
            className={css.popup}
            active={active}
            targetOrigin="right bottom"
            popupOrigin="right top"
            onClose={hide}
        >
            <div className={css.menuItem}>Бесполезная кнопка</div>
            {
                isDemo ? (
                    <a className={css.menuItem} href={getUrlByRoute({id: ROUTES_IDS.DEMO_LOGOUT})}>
                        Выйти из демо режима
                    </a>
                ) : (
                    <a className={css.menuItem} href={getUrlByRoute({id: ROUTES_IDS.STRAVA_UNAUTH})}>
                        Выйти
                    </a>
                )
            }
        </Popup>
    </PopupTarget>
);

const withActive = withStateHandlers(
    {active: false},
    {
        show: () => () => ({active: true}),
        hide: () => () => ({active: false}),
        toggle: ({active}) => () => ({active: !active}),
    },
);

export default withActive(MenuBtn);
