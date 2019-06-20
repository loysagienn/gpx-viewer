/** @jsx createElement */

import {createElement} from 'react';
import {connect} from 'react-redux';
import {showDay as showDayAction} from 'app/actions';
import {selectActiveDayKey, selectActiveDayActivities} from 'app/selectors';
import Modal from '../Modal';


const renderActivity = activity => (
    <div key={activity.id}>
        {activity.name}
    </div>
);

const DayModal = ({dayKey, activities, close}) => {
    if (!dayKey) {
        return null;
    }

    return (
        <Modal onClose={close}>
            {dayKey}
            {activities.map(renderActivity)}
        </Modal>
    );
};

const mapStateToProps = state => ({
    dayKey: selectActiveDayKey(state),
    activities: selectActiveDayActivities(state),
});

const enhance = connect(mapStateToProps, {close: () => showDayAction(null)});

export default enhance(DayModal);
