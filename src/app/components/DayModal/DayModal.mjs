/** @jsx createElement */

import {createElement} from 'react';
import {connect} from 'react-redux';
import {showDay as showDayAction} from 'app/actions';
import {selectActiveDayKey, selectActiveDayActivities} from 'app/selectors';
import {SvgCross} from '../Svg';
import Modal from '../Modal';
import ActivityInfo from '../ActivityInfo';
import {getDateStr} from './helpers';
import css from './DayModal.styl';


const renderActivity = activity => console.log(activity) || createElement(ActivityInfo, {key: activity.id, ...activity});

const DayModal = ({dayKey, activities, close}) => {
    if (!dayKey) {
        return null;
    }

    return (
        <Modal onClose={close} className={css.modal}>
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
        </Modal>
    );
};

const mapStateToProps = state => ({
    dayKey: selectActiveDayKey(state),
    activities: selectActiveDayActivities(state),
});

const enhance = connect(mapStateToProps, {close: () => showDayAction(null)});

export default enhance(DayModal);
