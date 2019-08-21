/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import {cn} from 'helpers';
import css from './TrackLines.styl';


class TrackLines extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = createRef();
        this.rootRef = createRef();
    }

    render() {
        const {className} = this.props;

        return (
            <div className={cn(css.root, className)}>
                <canvas
                    className={css.canvas}
                    ref={this.canvasRef}
                />
            </div>
        );
    }
}


export default TrackLines;
