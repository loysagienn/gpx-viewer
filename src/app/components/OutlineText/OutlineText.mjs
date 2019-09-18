/** @jsx createElement */

import {createElement, PureComponent, createRef} from 'react';
import {getDevicePixelRatio} from 'env';
import {fontFamily} from 'constants';
import css from './OutlineText.styl';

const defaultStyle = {lineHeight: 20, fontSize: 14, color: '#000000', outlineColor: '#ffffff'};

const prepareStyle = (style = {}) => Object.assign({}, defaultStyle, style);

const getReactStyle = ({lineHeight, fontSize, color}) => ({
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}px`,
    // color,
});

const canvasPadding = 2;

const getCanvasStyle = ({lineHeight, fontSize}) => (
    `${fontSize}px ${fontFamily}`
);

const setCanvasSize = (canvas, width, height, pixelRatio) => {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
};

const getCanvasPadding = ({lineHeight, fontSize}) => ([
    canvasPadding,
    canvasPadding + ((lineHeight - fontSize) / 2),
]);

class OutlineText extends PureComponent {
    constructor(props) {
        super(props);

        this.canvasRef = createRef();
        this.rootRef = createRef();
    }

    componentDidMount() {
        this.canvasCtx = this.canvasRef.current.getContext('2d');

        this.renderText();
    }

    componentDidUpdate() {
        this.renderText();
    }

    renderText = () => {
        const {canvasCtx, canvasNode, props, canvasSize, style} = this;
        const {width, height} = canvasSize;
        const {outlineColor, fontSize, color} = style;
        const {text} = props;

        const pixelRatio = getDevicePixelRatio();

        setCanvasSize(canvasNode, width, height, pixelRatio);

        canvasCtx.textBaseline = 'top';
        const [xPadding, yPadding] = getCanvasPadding(style);

        canvasCtx.scale(pixelRatio, pixelRatio);
        canvasCtx.font = getCanvasStyle(style);
        canvasCtx.strokeStyle = outlineColor;
        canvasCtx.fillStyle = color;
        canvasCtx.lineWidth = fontSize / 4;
        canvasCtx.lineCap = 'round';
        canvasCtx.lineJoin = 'round';
        canvasCtx.strokeText(text, xPadding, yPadding);
        canvasCtx.fillText(text, xPadding, yPadding);
    }

    render() {
        const {text, style} = this.props;

        this.style = prepareStyle(style);

        return (
            <div
                className={css.outlineText}
                style={getReactStyle(this.style)}
                ref={this.rootRef}
            >
                <canvas
                    className={css.canvas}
                    style={{
                        left: `${-canvasPadding}px`,
                        top: `${-canvasPadding}px`,
                    }}
                    ref={this.canvasRef}
                />
                <div className={css.text}>
                    {text}
                </div>
            </div>
        );
    }

    get canvasSize() {
        const {offsetWidth} = this.rootRef.current;
        const {lineHeight} = this.style;

        return {
            width: offsetWidth + (canvasPadding * 2),
            height: lineHeight + (canvasPadding * 2),
        };
    }

    get canvasNode() {
        return this.canvasRef.current;
    }
}


export default OutlineText;
