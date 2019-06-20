/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import css from './Modal.styl';


const Modal = ({children, onClose, className}) => (
    <div className={css.wrapper}>

        <div className={css.overlay} onClick={onClose}/>

        <div className={css.modalWrapper}>
            <div className={cn(css.modal, className)}>
                {children}
            </div>
        </div>
    </div>
);

export default Modal;
