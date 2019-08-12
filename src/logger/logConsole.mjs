
const logConsole = (level, data) => {
    const {key, ...rest} = data;

    console.log('');
    console.log(`--------------- ${key} ---------------`);

    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const prop in rest) console.log(`${prop}:`, rest[prop]);

    console.log('');
};


export default logConsole;
