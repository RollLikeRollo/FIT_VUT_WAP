/**
 * tested in node v18.7.0 email: xzbori20@stud.fit.vutbr.cz submission date: 2023-03-05
 * @brief 1st project for WAP
 * @file: iterate.mjs
 * @author: Jan Zbořil
 * @version: 1.0
 */

'use strict';

/**
 * ff
 * @param {*} obj dd
 * @param {*} descriptor dd
 * @param {*} prop_names dd
 * @returns dd
 */
function with_descriptor(obj, descriptor, prop_names) { 

    obj = Object.getPrototypeOf(obj);

    if (obj === null) {
        return prop_names;
    }

    while (obj !== null) {
        Object.entries(descriptor).forEach(([key, value]) => {
            if (value) {
                // console.log(key, value);
                // console.log(Object.getOwnPropertyNames(obj).filter((property) => {
                //     return Object.getOwnPropertyDescriptor(obj, property)[key]
                // }));
                prop_names = (Object.getOwnPropertyNames(obj).filter((property) => {
                    return Object.getOwnPropertyDescriptor(obj, property)[key];
                })).concat(prop_names);
            } else {
                // console.log(key, value);
                // console.log(Object.getOwnPropertyNames(obj).filter((property) => {
                //     return !Object.getOwnPropertyDescriptor(obj, property)[key]
                // }));
                // prop_names = (Object.getOwnPropertyNames(obj).filter((property) => {
                //     return !Object.getOwnPropertyDescriptor(obj, property)[key];
                // })).concat(prop_names);
                ;
            }
            // console.log(Object.getOwnPropertyNames(obj));
        });
        obj = Object.getPrototypeOf(obj);
    }
    
    return prop_names;
}

/**
 * ff
 * @param {*} obj ddd
 * @param {*} prop_names ddd
 * @returns dd
 */
function without_descriptor(obj, prop_names) {

    obj = Object.getPrototypeOf(obj);

    if ((obj) === null) {
        return prop_names;
    }
    
    let current_obj_prop_names = null;

    while (obj !== null) {
        current_obj_prop_names = Object.getOwnPropertyNames(obj);
        prop_names = current_obj_prop_names.concat(prop_names);

        obj = Object.getPrototypeOf(obj);
    }

    return prop_names;
}

/**
 * @brief Iterate over object properties
 * @param {*} obj daw
 * @param {*} descriptor dawd
 */
export function* iterateProperties(obj, descriptor = {}) {

    let prop_names = Object.getOwnPropertyNames(obj);

    const isDescriptorempty = !Object.keys(descriptor).length;

    if (isDescriptorempty) { 
        yield* without_descriptor(obj, prop_names);
    } else {
        yield* with_descriptor(obj, descriptor, prop_names);
    }

    return prop_names;
}
