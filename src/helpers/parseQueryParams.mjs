
import {reduce, map, assoc, compose, split} from 'ramda';

export default compose(reduce((acc, [id, value]) => assoc(id, value, acc), {}), map(split('=')), split('&'));
