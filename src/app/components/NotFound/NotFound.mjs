/** @jsx createElement */

import {createElement} from 'react';
import Button from '../Button';
import Text from '../Text';
import css from './NotFound.styl';

const NotFound = () => (
    <div className={css.notFound}>
        <div className={css.block}>
            <Text size="1" className={css.heading}>404</Text>
            <Text size="4" className={css.desc}>Страница не найдена</Text>
            <Button href="/">Перейти на главную</Button>
        </div>
    </div>
);

export default NotFound;
