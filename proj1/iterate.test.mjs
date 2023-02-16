import * as iterate from './iterate.mjs';

function logGeneratedValues(gen) {
	for (let prop of gen) {
		console.log(prop);
	}
}

beforeEach(() => {
    jest.clearAllMocks();
  });

test("logGeneratedValues does not return anything", () => {
    expect(logGeneratedValues([1,2,3])).not.toBeDefined();
});

test('Does logGeneratedValues logs correctly on iterable object', () => {
    const consoleSpy1 = jest.spyOn(console, 'log');
  
    logGeneratedValues([1,2,3])
  
    expect(consoleSpy1).toHaveBeenCalledWith(1);
    expect(consoleSpy1).toHaveBeenCalledWith(2);
    expect(consoleSpy1).toHaveBeenCalledWith(3);
});

test('Is iterateProperties defined', () => { 
    iterate.iterateProperties();
    expect(iterate.iterateProperties()).toBeDefined();
});

test('iterateProperties with no parameters', () => { 
    const t = () => { logGeneratedValues(iterate.iterateProperties()) };
    expect(t).toThrow();
});

test('iterateProperties with null as obj', () => { 
    const t = () => { logGeneratedValues(iterate.iterateProperties(null)) };
    expect(t).toThrow();
});

test('iterateProperties with undefined as obj', () => { 
    const t = () => { logGeneratedValues(iterate.iterateProperties(undefined)) };
    expect(t).toThrow();
});

test('iterateProperties with null as obj - with descriptor', () => { 
    const t = () => {
        logGeneratedValues(
            iterate.iterateProperties(null, {enumerable: true}))
    };
    expect(t).toThrow();
});

test('iterateProperties with undefined as obj - with descripto', () => { 
    const t = () => {
        logGeneratedValues(iterate.iterateProperties(undefined, {enumerable: true}))
    };
    expect(t).toThrow();
});

test('iterateProperties with empty object as obj', () => {
    const consoleSpy2 = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties({}));
    expect(consoleSpy2).toHaveBeenCalledWith('constructor');
    expect(consoleSpy2).toHaveBeenCalledWith('__defineGetter__');
    expect(consoleSpy2).toHaveBeenCalledWith('__defineSetter__');
});

test('iterateProperties with Object.prototype', () => { 
    const consoleSpy = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties(Object.prototype));

    expect(consoleSpy).toHaveBeenCalledWith('constructor');
    expect(consoleSpy).toHaveBeenCalledWith('__defineGetter__');
    expect(consoleSpy).toHaveBeenCalledWith('__defineSetter__');
    expect(consoleSpy).toHaveBeenCalledWith('hasOwnProperty');
    expect(consoleSpy).toHaveBeenCalledWith('__lookupGetter__');
    expect(consoleSpy).toHaveBeenCalledWith('__lookupSetter__');
    expect(consoleSpy).toHaveBeenCalledWith('isPrototypeOf');
    expect(consoleSpy).toHaveBeenCalledWith('propertyIsEnumerable');
    expect(consoleSpy).toHaveBeenCalledWith('toString');
    expect(consoleSpy).toHaveBeenCalledWith('valueOf');
    expect(consoleSpy).toHaveBeenCalledWith('__proto__');
    expect(consoleSpy).toHaveBeenCalledWith('toLocaleString');
});

test('iterateProperties with simple object', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let expected = [
        "constructor",
        '__defineGetter__',
        '__defineSetter__',
        'hasOwnProperty',
        '__lookupGetter__',
        '__lookupSetter__',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toString',
        'valueOf',
        '__proto__',
        'toLocaleString',
        'a',
        'b',
        'c'
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj)) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with simple object with protoype chain', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let obj2 = Object.create(obj);
    obj2.d = 4;

    let expected = [
        "constructor",
        '__defineGetter__',
        '__defineSetter__',
        'hasOwnProperty',
        '__lookupGetter__',
        '__lookupSetter__',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toString',
        'valueOf',
        '__proto__',
        'toLocaleString',
        'a',
        'b',
        'c',
        'd'
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj2)) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with simple object with enumerable:true', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let expected = [
        'a',
        'b',
        'c'
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj, {enumerable: true})) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with simple object with protoype chain, enumerable:true', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let obj2 = Object.create(obj);
    obj2.d = 4;

    let expected = [
        'a',
        'b',
        'c',
        'd'
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj2, {enumerable: true})) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with simple object with protoype chain, enumerable:false', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let obj2 = Object.create(obj);
    obj2.d = 4;

    let expected = [
        'constructor',
        '__defineGetter__',
        '__defineSetter__',
        'hasOwnProperty',
        '__lookupGetter__',
        '__lookupSetter__',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toString',
        'valueOf',
        '__proto__',
        'toLocaleString'
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj2, {enumerable: false})) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with simple object with protoype chain, writable:false', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let obj2 = Object.create(obj);
    Object.defineProperty(obj2, "d", {
        value: 10,
        writable: false,
        enumerable: true,
    });

    let expected = [
        'd'
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj2, {writable: false})) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with more simple objects - mixed calls', () => { 
    let obj1 = {
        a1: 1,
        b1: 2,
        c1: 3,
    };

    let obj2 = {
        a2: 11,
        b2: 22,
        c2: 33,
    };

    let expected = [
        'a2',
        'a1',
        'b2',
        'c2',
        'b1',
        'c1'
    ];
    let ip1 = iterate.iterateProperties(obj1, {enumerable: true});
    let ip2 = iterate.iterateProperties(obj2, {enumerable: true});
    expect(ip2.next().value).toEqual(expected[0]);
    expect(ip1.next().value).toEqual(expected[1]);
    expect(ip2.next().value).toEqual(expected[2]);
    expect(ip2.next().value).toEqual(expected[3]);
    expect(ip1.next().value).toEqual(expected[4]);
    expect(ip1.next().value).toEqual(expected[5]);
});

test('iterateProperties with more simple objects - mixed calls', () => { 
    let obj1 = {
        a1: 1,
        b1: 2,
        c1: 3,
    };

    let obj2 = {
        a2: 11,
        b2: 22,
        c2: 33,
    };

    let expected = [
        'a2',
        'a1',
        'b2',
        'c2',
        'b1',
        'c1'
    ];
    let ip1 = iterate.iterateProperties(obj1, {enumerable: true});
    let ip2 = iterate.iterateProperties(obj2, {enumerable: true});
    expect(ip2.next().value).toEqual(expected[0]);
    expect(ip1.next().value).toEqual(expected[1]);
    expect(ip2.next().value).toEqual(expected[2]);
    expect(ip2.next().value).toEqual(expected[3]);
    expect(ip1.next().value).toEqual(expected[4]);
    expect(ip1.next().value).toEqual(expected[5]);
});

test('iterateProperties with invalid descriptor', () => { 
    let obj = {
        a: 1,
        b: 2,
        c: 3
    };

    let expected = [
        "a",
        "b",
        "c"
    ];
    let i = 0;
    for (const  prop of iterate.iterateProperties(obj, {nonsens: 'randomstring'})) {
        expect(prop).toEqual(expected[i]);
        i++;
    }
});

test('iterateProperties with writable false', () => { 
    let obj = {};
    Object.defineProperty(obj, "prop", {
        writable: false,
        enumerable: false,
    });

    let i = 0;
    for (const  prop of iterate.iterateProperties(obj, {writable: false})) {
        expect(prop).toEqual('prop');
        i++;
    }
});

test('iterateProperties with true -> false', () => { 
    let obj = {};
    Object.defineProperty(obj, "prop", {
        writable: true,
        enumerable: false,
    });


    let i = 0;
    for (const  prop of iterate.iterateProperties(obj, {enumerable: true})) {
        expect(prop).toEqual('');
        i++;
    }
});