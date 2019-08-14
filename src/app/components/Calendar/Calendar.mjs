/** @jsx createElement */

import {createElement, PureComponent, createRef} from 'react';
import {connect} from 'react-redux';
import {pushMonth as pushMonthAction} from 'app/actions';
import Month from './Month';
import css from './Calendar.styl';


const MIN_BOTTOM_SPACE = 200;

class Calendar extends PureComponent {
    constructor(props) {
        super(props);

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
        const {monthsKeys} = this.props;

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
                        monthsKeys.map(monthKey => <Month monthKey={monthKey} key={monthKey}/>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({monthsKeys}) => ({monthsKeys});

const enhance = connect(mapStateToProps, {pushMonth: pushMonthAction});

export default enhance(Calendar);
