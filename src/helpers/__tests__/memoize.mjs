import memoize from '../memoize';

const getInc = () => {
    let val = 0;

    return () => ++val;
};

describe('memoize', () => {
    let func;

    const resetTestFunc = timeout => func = memoize(getInc(), timeout);

    beforeEach(() => resetTestFunc());

    test('вызывает функцию', () => {
        expect(func()).toEqual(1);
    });

    test('кэширует значение функции без аргументов', () => {
        expect(func()).toEqual(1);
        expect(func()).toEqual(1);
    });

    test('кэширует функцию для одного аргумента', () => {
        expect(func('a')).toEqual(1);
        expect(func('a')).toEqual(1);
    });

    test('кэширует функцию для нескольких аргументов', () => {
        expect(func('a', 'b')).toEqual(1);
        expect(func('a', 'b', 'c')).toEqual(2);
        expect(func('a', 'b', 'c', 'd')).toEqual(3);

        expect(func('a', 'b')).toEqual(1);
        expect(func('a', 'b', 'c')).toEqual(2);
        expect(func('a', 'b', 'c', 'd')).toEqual(3);
    });

    test('правильно работает с разными типами аргументов примитивов', () => {
        expect(func(0)).toEqual(1);
        expect(func('')).toEqual(2);
        expect(func('0')).toEqual(3);
        expect(func(false)).toEqual(4);
        expect(func(true)).toEqual(5);
        expect(func(null)).toEqual(6);

        expect(func(0)).toEqual(1);
        expect(func('')).toEqual(2);
        expect(func('0')).toEqual(3);
        expect(func(false)).toEqual(4);
        expect(func(true)).toEqual(5);
        expect(func(null)).toEqual(6);
    });

    test('работает с объектами', () => {
        const firstObj = {};
        const secondObj = {};

        expect(func(firstObj)).toEqual(1);
        expect(func(secondObj)).toEqual(2);
        expect(func(firstObj, secondObj)).toEqual(3);

        expect(func(firstObj)).toEqual(1);
        expect(func(secondObj)).toEqual(2);
        expect(func(firstObj, secondObj)).toEqual(3);
    });

    test('очищает кэш по таймауту', () => {
        jest.useFakeTimers();
        // ставим таймаут 1000 мс
        resetTestFunc(1000);

        expect(func()).toEqual(1);
        expect(func(true)).toEqual(2);
        expect(func(true, false)).toEqual(3);

        jest.advanceTimersByTime(500);

        // через 500 мс значения берутся из кэша
        expect(func()).toEqual(1);
        expect(func(true)).toEqual(2);
        expect(func(true, false)).toEqual(3);

        jest.advanceTimersByTime(1000);

        // еще через 1000 мс кэш уже почищен
        expect(func()).toEqual(4);
        expect(func(true)).toEqual(5);
        expect(func(true, false)).toEqual(6);
    });
});
