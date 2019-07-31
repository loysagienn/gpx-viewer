/** @jsx createElement */

import {Component, createElement, createRef} from 'react';
import {cn} from 'helpers';
import {nextFrame, addWindowEvent, removeWindowEvent} from 'env';
import {KEY_CODE} from 'constants';
import setPopupPosition from './setPopupPosition';
import popupContext from './popupContext';
import withOrigins from './withOrigins';
import css from './Popup.styl';


const TRANSITION_TIMEOUT = 0.25;
const transition = `opacity ${TRANSITION_TIMEOUT}s ease-out, transform ${TRANSITION_TIMEOUT}s ease-out`;
const popupCloseReasons = {
    outsideTargetClick: 'outsideTargetClick',
    scroll: 'scroll',
    escClick: 'escClick',
};

class Popup extends Component {
    constructor(props) {
        super(props);

        this.popupRef = createRef();
        this.isVisible = props.active;
        this.isInitialPosition = false;
        this.hideTimeout = null;
        this.showTimeout = null;
    }

    componentDidMount() {
        if (this.isVisible) {
            this.addWindowEvents();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.active && this.props.active) {
            this.show();
        }

        if (prevProps.active && !this.props.active) {
            this.hide();
        }
    }

    addWindowEvents = () => {
        addWindowEvent('scroll', this.onScroll, true);
        addWindowEvent('resize', this.onScroll, true);
        addWindowEvent('click', this.onWindowClick);
        addWindowEvent('keydown', this.onKeyDown);
    }

    removeWindowEvents = () => {
        removeWindowEvent('scroll', this.onScroll, true);
        removeWindowEvent('resize', this.onScroll, true);
        removeWindowEvent('click', this.onWindowClick);
        removeWindowEvent('keydown', this.onKeyDown);
    }

    show = () => {
        if (this.isVisible && !this.hideTimeout) {
            return;
        }

        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        this.showTimeout = setTimeout(() => {
            this.showTimeout = null;
            this.updatePosition();
        }, TRANSITION_TIMEOUT * 1000);

        this.isInitialPosition = true;
        this.isVisible = true;
        this.forceUpdate();

        this.addWindowEvents();
    }

    hide = () => {
        if (this.hideTimeout || !this.isVisible) {
            return;
        }

        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }

        this.hideTimeout = setTimeout(() => {
            this.hideTimeout = null;
            this.isVisible = false;
            this.forceUpdate();
            this.removeWindowEvents();
        }, TRANSITION_TIMEOUT * 1000);
    }

    updatePosition = () => {
        const {targetRef} = this.context;
        const {popupRef, isVisible, isInitialPosition, showTimeout, hideTimeout} = this;
        const {targetOrigin, popupOrigin} = this.props;
        const popupNode = popupRef.current;
        const targetNode = targetRef.current;

        // console.log('update position call');

        if (!isVisible) {
            return;
        }

        if (!targetNode || !popupNode) {
            // если вдруг еще не успели отрисоваться - ждем следующей отрисовки
            nextFrame(this.updatePosition);

            return;
        }

        if (!isInitialPosition && (showTimeout || hideTimeout)) {
            popupNode.style.transition = transition;
        } else {
            popupNode.style.transition = '';
        }

        const shown = this.props.active && !isInitialPosition;

        setPopupPosition(targetNode, popupNode, shown, targetOrigin, popupOrigin);

        if (isInitialPosition) {
            this.isInitialPosition = false;

            nextFrame(this.updatePosition);
        }
    }

    onScroll = () => {
        const {targetRef} = this.context;
        const {popupRef, isInitialPosition} = this;
        const popupNode = popupRef.current;
        const targetNode = targetRef.current;
        const {targetOrigin, popupOrigin} = this.props;

        if (!targetNode || !popupNode) {
            return;
        }

        const shown = this.props.active && !isInitialPosition;

        setPopupPosition(targetNode, popupNode, shown, targetOrigin, popupOrigin);

        const {active, onClose} = this.props;

        if (active && onClose) {
            onClose(popupCloseReasons.scroll);
        }
    }

    onKeyDown = (event) => {
        const {active, onClose} = this.props;

        if (active && onClose && event.keyCode === KEY_CODE.ESC) {
            onClose(popupCloseReasons.escClick);
        }
    }

    onWindowClick = (event) => {
        const {active, onClose} = this.props;

        if (active && onClose && !event[this.context.popupTargetClickId]) {
            onClose(popupCloseReasons.outsideTargetClick);
        }
    }

    onTargetOutsideClick = () => {
        console.log('target outside click');
    }

    render() {
        if (!this.isVisible) {
            return null;
        }

        const {children, className} = this.props;

        nextFrame(this.updatePosition);

        return (
            <div
                className={cn(css.popup, className)}
                ref={this.popupRef}
            >
                {typeof children === 'function' ? children() : children}
            </div>
        );
    }

    static contextType = popupContext;
}


export default withOrigins(Popup);
