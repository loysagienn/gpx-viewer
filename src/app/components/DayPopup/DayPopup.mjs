/** @jsx createElement */

import {createElement} from 'react';
import {withStateHandlers} from 'recompose';
import {SvgCross} from '../Svg';
import ActivityInfo from '../ActivityInfo';
import {getDateStr} from './helpers';
import css from './DayPopup.styl';


const renderActivity = activity => createElement(ActivityInfo, {key: activity.id, ...activity});

const DayPopup = ({dayKey, activities, close}) => {
    if (!dayKey) {
        return null;
    }

    return (
        <div className={css.popup}>
            <div className={css.header}>
                <div>
                    {getDateStr(dayKey)}
                </div>
                <div
                    className={css.closeBtn}
                    onClick={close}
                >
                    <SvgCross className={css.crossIcon}/>
                </div>
            </div>
            {activities.map(renderActivity)}
        </div>
    );
};

const withActive = withStateHandlers(
    {popupActive: false},
    {
        showPopup: () => () => ({popupActive: true}),
        hidePopup: () => () => ({popupActive: false}),
        togglePopup: ({popupActive}) => () => ({popupActive: !popupActive}),
    },
);


export default withActive(DayPopup);
