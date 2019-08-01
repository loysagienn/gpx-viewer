/** @jsx createElement */

import {createElement} from 'react';
import {withStateHandlers} from 'recompose';
import {ROUTES_IDS, getUrlByRoute} from 'router';
import {locationAssign} from 'env';
import {SvgMenu} from '../Svg';
import {Popup, PopupTarget} from '../Popup';
import css from './AthleteHeader.styl';


const unauthorize = () => locationAssign(getUrlByRoute({id: ROUTES_IDS.STRAVA_UNAUTH}));

const MenuBtn = ({active, hide, toggle}) => (
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
            <div className={css.menuItem}>Мои подписки</div>
            <div className={css.menuItem} onClick={unauthorize}>Выйти</div>
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