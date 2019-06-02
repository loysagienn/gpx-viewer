/** @jsx createElement */

import {createElement, PureComponent, createRef} from 'react';
import {DEFAULT_MONTH_COUNT} from 'constants';
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

        this.monthsOffset = getOffsets(DEFAULT_MONTH_COUNT);

        this.scrollHandler = event => this.onScroll(event);
        this.wrapperRef = createRef();
    }

    onScroll() {
        const {monthsOffset, wrapperRef} = this;
        const {scrollHeight, clientHeight, scrollTop} = wrapperRef.current;

        const bottomSpace = scrollHeight - clientHeight - scrollTop;

        if (bottomSpace < MIN_BOTTOM_SPACE) {
            monthsOffset.push(monthsOffset[monthsOffset.length - 1] + 1);

            this.forceUpdate();
        }
    }

    render() {
        return (
            <div
                className={css.wrapper}
                onScroll={this.scrollHandler}
                ref={this.wrapperRef}
            >
                <div
                    className={css.calendar}
                >
                    {
                        this.monthsOffset.map(offset => <Month offset={offset} key={offset}/>)
                    }
                </div>
            </div>
        );
    }
}

export default Calendar;
