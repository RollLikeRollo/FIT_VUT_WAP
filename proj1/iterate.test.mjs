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
    let obj = { a: 1, b: 2, c: 3 };
    const consoleSpy = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties(obj));

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
    expect(consoleSpy).toHaveBeenCalledWith('a');
    expect(consoleSpy).toHaveBeenCalledWith('b');
    expect(consoleSpy).toHaveBeenCalledWith('c');
});

test('iterateProperties with simple object with inheritance', () => { 
    let obj = { a: 1, b: 2, c: 3 };
    let obj2 = Object.create(obj);
    obj2.a = 4;
    obj2['new'] = 5;
    const consoleSpy = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties(obj2));

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
    expect(consoleSpy).toHaveBeenCalledWith('a');
    expect(consoleSpy).toHaveBeenCalledWith('b');
    expect(consoleSpy).toHaveBeenCalledWith('c');
    expect(consoleSpy).toHaveBeenCalledWith('new');
});

test('iterateProperties with simple object with inheritance with filter: enmuerable', () => { 
    let obj = { a: 1, b: 2, c: 3 };
    let obj2 = Object.create(obj);
    obj2.a = 4;
    obj2['new'] = 5;
    const consoleSpy = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties(obj2, {enumerable: true}));

    expect(consoleSpy).toHaveBeenCalledWith('new');
    expect(consoleSpy).toHaveBeenCalledWith('a');
    expect(consoleSpy).toHaveBeenCalledWith('b');
    expect(consoleSpy).toHaveBeenCalledWith('c');
    
});

test('iterateProperties with simple object with inheritance with filter: writable true', () => { 
    let obj = { a: 1, b: 2, c: 3 };
    let obj2 = Object.create(obj);
    obj2.a = 4;
    Object.defineProperty(obj2, "writable_p", {
        value: 10,
        writable: true,
    });
    const consoleSpy = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties(obj2, {writable: true}));

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
    expect(consoleSpy).toHaveBeenCalledWith('toLocaleString');
    expect(consoleSpy).toHaveBeenCalledWith('a');
    expect(consoleSpy).toHaveBeenCalledWith('b');
    expect(consoleSpy).toHaveBeenCalledWith('c');
    expect(consoleSpy).toHaveBeenCalledWith('writable_p');
});


test('iterateProperties with simple object with inheritance with filter: writable false', () => { 
    let obj = { a: 1, b: 2, c: 3 };
    let obj2 = Object.create(obj);
    Object.defineProperty(obj2, "not_writable_p", {
        value: 10,
        writable: true,
        enumerable: true
    });
    console.log('------');
    const consoleSpy = jest.spyOn(console, 'log');
    logGeneratedValues(iterate.iterateProperties(obj2, {writable: false}));

    expect(consoleSpy).toHaveBeenCalledWith('');
});

test('', () => { 
    ;
});

test('', () => { 
    ;
});

