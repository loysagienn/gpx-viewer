/** @jsx createElement */

import {Component, createElement, createRef} from 'react';
import {Provider} from './popupContext';


let popupCounter = 0;

class PopupTarget extends Component {
    constructor(props) {
        super(props);

        this.targetRef = createRef();

        this.popupTargetClickId = `__POPUP_TARGET_${++popupCounter}_CLICK__`;
    }

    onClick = (event) => {
        event.nativeEvent[this.popupTargetClickId] = true;

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        const {popupTargetClickId, targetRef} = this;
        const {className, children} = this.props;

        const value = {popupTargetClickId, targetRef};

        return (
            <Provider value={value}>
                <div
                    className={className}
                    ref={this.targetRef}
                    onClick={this.onClick}
                >
                    {children}
                </div>
            </Provider>
        );
    }
}


export default PopupTarget;
