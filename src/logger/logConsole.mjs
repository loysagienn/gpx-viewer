
const logConsole = (key, data) => {
    console.log('');
    console.log(`--------------- ${key} ---------------`);

    if (data) {
        if (typeof data === 'object') {
            // eslint-disable-next-line no-restricted-syntax,guard-for-in
            for (const prop in data) console.log(`${prop}:`, data[prop]);
        } else {
            console.log(data);
        }
    }

    console.log('');
};


export default logConsole;
