/** @jsx createElement */

import {createElement} from 'react';
import {Popup} from '../Popup';
import DayActivities from '../DayActivities';
import css from './Day.styl';


const DayPopup = ({disabled, active, onClose, dayKey, activities}) => {
    if (disabled) {
        return null;
    }

    return (
        <Popup
            className={css.popup}
            active={active}
            onClose={reason => (reason !== 'scroll') && onClose()}
            popupOrigin="auto auto"
        >
            {
                () => (
                    <DayActivities
                        dayKey={dayKey}
                        activities={activities}
                        close={onClose}
                    />
                )
            }
        </Popup>
    );
};


export default DayPopup;
