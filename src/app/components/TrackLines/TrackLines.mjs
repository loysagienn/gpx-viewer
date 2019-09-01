/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import {cn} from 'helpers';
import {getDevicePixelRatio, addWindowEvent, removeWindowEvent} from 'env';
import css from './TrackLines.styl';
import renderLine from './renderLine';


const setCanvasSize = (canvas, width, height, pixelRatio) => {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
};

class TrackLines extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = createRef();
        this.rootRef = createRef();
        this.currentSize = [0, 0];
    }

    componentDidMount() {
        this.canvasCtx = this.canvasRef.current.getContext('2d');

        this.updateSize();

        addWindowEvent('resize', this.updateSize);
    }

    componentDisUpdate() {
        this.updateSize();
    }

    componentWillUnmount() {
        removeWindowEvent('resize', this.updateSize);
    }

    updateSize = () => {
        const [currentWidth, currentHeight] = this.currentSize;
        const {offsetWidth: width, offsetHeight: height} = this.rootRef.current;

        const pixelRatio = getDevicePixelRatio();

        if (currentWidth === width && currentHeight === height) {
            return;
        }

        setCanvasSize(this.canvasRef.current, width, height, pixelRatio);

        this.canvasCtx.lineWidth = 2 * pixelRatio;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.lineJoin = 'round';

        this.props.lines.forEach(({values, color, maxValue}) => renderLine(
            this.canvasCtx,
            values,
            width * pixelRatio,
            height * pixelRatio,
            color,
            maxValue,
        ));

        this.currentSize = [width, height];
    }

    render() {
        const {className} = this.props;

        return (
            <div
                className={cn(css.root, className)}
                ref={this.rootRef}
            >
                <canvas
                    className={css.canvas}
                    ref={this.canvasRef}
                />
            </div>
        );
    }
}


export default TrackLines;
