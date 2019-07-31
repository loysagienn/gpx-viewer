/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {withStateHandlers} from 'recompose';
import {PopupTarget} from '../Popup';
import DayPopup from './DayPopup';
import DayContent from './DayContent';
import css from './Day.styl';


class Day extends PureComponent {
    render() {
        if (this.props.isEmpty) {
            return (
                <div className={css.dayWrapper}><div className={css.spacer}/></div>
            );
        }

        const {activities, popupActive, hidePopup, togglePopup, dayInfo} = this.props;

        const {dayKey, isFutureDay} = dayInfo;

        const disabled = isFutureDay || !activities;

        return (
            <PopupTarget className={css.dayWrapper}>
                <div className={css.spacer}/>
                <DayContent
                    onClick={togglePopup}
                    dayInfo={dayInfo}
                    activities={activities}
                    disabled={disabled}
                />
                <DayPopup
                    disabled={disabled}
                    active={popupActive}
                    onClose={hidePopup}
                    dayKey={dayKey}
                    activities={activities}
                />
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
