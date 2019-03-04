
import toCamelCase from '../toCamelCase';

describe('toCamelCase', () => {
    test('преобразует ключи объекта в camel case', () => {
        expect(toCamelCase({foo_bar: 1, 'foo-bar-baz': 2})).toEqual({fooBar: 1, fooBarBaz: 2});
    });

    test('ничего не делает с уже camel case ключами', () => {
        expect(toCamelCase({fooBar: 1, firstName: 2})).toEqual({fooBar: 1, firstName: 2});
    });

    test('не меняет странные ключи', () => {
        expect(toCamelCase({foo_ba___r: 1, 'first__--name': 2, 'ab-cd___e45r': 3, ___: 4, ___44345__: 5}))
            .toEqual({foo_ba___r: 1, 'first__--name': 2, 'ab-cd___e45r': 3, ___: 4, ___44345__: 5});
    });

    test('ничего не делает с примитивами', () => {
        expect(toCamelCase(1)).toBe(1);
        expect(toCamelCase('a')).toBe('a');
        expect(toCamelCase(false)).toBe(false);
        expect(toCamelCase(null)).toBe(null);
        expect(toCamelCase(undefined)).toBe(undefined);
    });

    test('работает рекурсивно', () => {
        expect(toCamelCase({us_er: {first_name: 'Alex'}})).toEqual({usEr: {firstName: 'Alex'}});
    });

    test('работает с массивами', () => {
        expect(toCamelCase([{first_name: 'Alex'}, {first_name: 'Max'}]))
            .toEqual([{firstName: 'Alex'}, {firstName: 'Max'}]);
    });
});
