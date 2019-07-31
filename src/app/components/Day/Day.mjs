/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {withStateHandlers} from 'recompose';
import {cn} from 'helpers';
import {Popup, PopupTarget} from '../Popup';
import DayPopup from '../DayPopup';
import css from './Day.styl';
import Activity from './Activity';


const renderActivities = (activities) => {
    if (!activities || activities.length === 0) {
        return (
            <div className={css.emptyPlaceholder}>
                <div>Нет</div>
                <div>тренировок</div>
            </div>
        );
    }

    return activities.map(activity => (
        <Activity key={activity.id} {...activity}/>
    ));
};

class Day extends PureComponent {
    render() {
        const {
            dayKey, monthDay, monthGenitive, isWeekEnd,
            isFutureDay, isEmpty, activities,
            popupActive, hidePopup, togglePopup,
        } = this.props;

        if (isEmpty) {
            return (
                <div className={css.dayWrapper}><div className={css.spacer}/></div>
            );
        }

        const disabled = isFutureDay || !activities;

        const dayClassName = cn(
            css.day,
            isWeekEnd && css.isWeekEnd,
            disabled && css.disabled,
        );

        const activitiesNode = renderActivities(activities);

        return (
            <PopupTarget className={css.dayWrapper}>
                <div className={css.spacer}/>
                <div className={dayClassName} onClick={() => !disabled && togglePopup()}>
                    <div className={css.dayTitle}>
                        <span>{monthDay}</span>
                        <span className={css.monthGenitive}>{` ${monthGenitive}`}</span>
                    </div>
                    <div className={css.activities}>
                        {activitiesNode}
                    </div>
                </div>
                {
                    !disabled && (
                        <Popup
                            className={css.popup}
                            active={popupActive}
                            onClose={hidePopup}
                            targetOrigin="center center"
                            popupOrigin="center center"
                        >
                            {
                                () => (
                                    <DayPopup
                                        dayKey={dayKey}
                                        activities={activities}
                                        close={hidePopup}
                                    />
                                )
                            }
                        </Popup>
                    )
                }
            </PopupTarget>
        );
    }
}

const withActive = withStateHandlers(
    {popupActive: false},
    {
        showPopup: () => () => ({popupActive: true}),
        hidePopup: () => () => ({popupActive: false}),
        togglePopup: ({popupActive}) => () => ({popupActive: !popupActive}),
    },
);


export default withActive(Day);
