/** @jsx createElement */

import {createElement} from 'react';
import css from './AthleteHeader.styl';
import MenuBtn from './MenuBtn';


const getUserName = ({firstname, lastname, username}) => {
    if (firstname && lastname) {
        return `${firstname} ${lastname}`;
    }

    return firstname || username || 'Undefined user';
};

const AthleteHeader = ({athleteInfo}) => console.log(athleteInfo) || (
    <div className={css.header}>
        <div className={css.headerInner}>
            <div className={css.leftButtons}>
                <div className={css.headerButton}>
                    {getUserName(athleteInfo)}
                </div>
            </div>

            <div className={css.rightButtons}>
                <div className={css.headerButton}>
                    <MenuBtn/>
                </div>
            </div>
        </div>
    </div>
);


export default AthleteHeader;
