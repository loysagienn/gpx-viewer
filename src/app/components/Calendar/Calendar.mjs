/** @jsx createElement */

import {createElement, PureComponent, createRef} from 'react';
import {connect} from 'react-redux';
import {pushMonth as pushMonthAction} from 'app/actions';
import DayModal from '../DayModal';
import {Popup, PopupTarget} from '../PopupNew';
import Month from './Month';
import css from './Calendar.styl';


const MIN_BOTTOM_SPACE = 200;

const getOffsets = (count) => {
    const offsets = [];

    for (let i = 0; i < count; i++) {
        offsets.push(i);
    }

    return offsets;
};

class Calendar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            popupVisible: true,
        };

        this.scrollHandler = event => this.onScroll(event);
        this.wrapperRef = createRef();
    }

    onScroll() {
        const {wrapperRef, props} = this;
        const {scrollHeight, clientHeight, scrollTop} = wrapperRef.current;

        const bottomSpace = scrollHeight - clientHeight - scrollTop;

        if (bottomSpace < MIN_BOTTOM_SPACE) {
            props.pushMonth();
        }
    }

    render() {
        const {monthCount} = this.props;

        const monthsOffset = getOffsets(monthCount);

        return (
            <div
                className={css.wrapper}
                onScroll={this.scrollHandler}
                ref={this.wrapperRef}
            >
                <DayModal/>

                <div className={css.popupTargetWrapper}>
                    <PopupTarget className={css.popupTarget}>
                        <span onClick={() => this.setState({popupVisible: !this.state.popupVisible})}>
                            popup anchor
                        </span>
                        <Popup
                            className={css.popup}
                            active={this.state.popupVisible}
                            onClose={() => this.setState({popupVisible: false})}
                            targetOrigin="left bottom"
                            popupOrigin="left top"
                        >
                            {
                                () => (
                                    <div>
                                        <div>popup content popup content popup content popup content</div>
                                        <div>popup content popup content popup content popup content</div>
                                        <div>popup content popup content popup content popup content</div>
                                        <div>popup content popup content popup content popup content</div>
                                        <div>popup content popup content</div>
                                        <div>popup content popup content popup content</div>
                                        <div>popup content popup content popup content</div>
                                        <div>popup content popup content popup content popup</div>
                                        <div>popup content popup content popup</div>
                                    </div>
                                )
                            }
                        </Popup>
                    </PopupTarget>
                </div>
                <div
                    className={css.calendar}
                >
                    {
                        monthsOffset.map(offset => <Month offset={offset} key={offset}/>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({monthCount}) => ({monthCount});

const enhance = connect(mapStateToProps, {pushMonth: pushMonthAction});

export default enhance(Calendar);
