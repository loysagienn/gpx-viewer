import log from 'logger';


const assignState = (state, data) => {
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key in state) {
            log.duplicateStateKeys({key});
        }
    }

    return Object.assign(state, data);
};


export default assignState;
