/** @jsx createElement */

import {createElement, PureComponent, createRef} from 'react';
import {getDevicePixelRatio} from 'env';
import {fontFamily} from 'constants';
import {cn} from 'helpers';
import css from './OutlineText.styl';

const defaultStyle = {fontSize: 14, color: '#000000', fontWeight: 'normal', outlineColor: '#ffffff'};

const prepareStyle = (style = {}) => {
    style = Object.assign({}, defaultStyle, style);

    if (!style.lineHeight) {
        style.lineHeight = Math.round(style.fontSize * 1.5);
    }

    return style;
};

const getReactStyle = ({lineHeight, fontSize, fontWeight}) => ({
    fontSize: `${fontSize}px`,
    lineHeight: `${lineHeight}px`,
    fontWeight,
});

const canvasPadding = 2;

const getCanvasStyle = ({lineHeight, fontSize, fontWeight}) => (
    `${fontWeight} ${fontSize}px/${lineHeight}px ${fontFamily}`
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
        canvasCtx.lineWidth = Math.min(fontSize / 4, 5);
        canvasCtx.lineCap = 'round';
        canvasCtx.lineJoin = 'round';
        canvasCtx.strokeText(text, xPadding, yPadding, width - (canvasPadding * 2));
        canvasCtx.fillText(text, xPadding, yPadding, width - (canvasPadding * 2));
    }

    render() {
        const {text, style} = this.props;

        this.style = prepareStyle(style);

        return (
            <div
                className={css.outlineText}
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
                <div
                    className={css.text}
                    style={getReactStyle(this.style)}
                >
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

export const OutlineTextGroup = ({className, children}) => (
    <div className={cn(className, css.outlineTextGroup)}>
        {children}
    </div>
);


export default OutlineText;
