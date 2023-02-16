/**
 * tested in node v18.7.0 
 * email: xzbori20@stud.fit.vutbr.cz 
 * submission date: 2023-03-05
 * @brief 1st project for WAP subject
 * at FIT VUT Brno
 * @file: iterate.mjs
 * @author: Jan Zbořil <xzbori20@stud.fit.vutbr.cz>
 * @version: 1.0
 */

'use strict';

/**
 * Function to filter properties of Object strictly matching given description.
 * @param {Object} obj Object on which we want to filter properties
 * @param {String} key The name of the property by which we want to filter - 
 * eg. 'enumerable' or 'writable'
 * @returns {String[]} Array of strings containing names of properties that match 
 * the filter specified by key
 */
function filter_properties(obj, key, value) {
    
    let filtered_p = [];
    let current_obj_prop = Object.getOwnPropertyDescriptors(obj);

    for (const [prop, desc] of Object.entries(current_obj_prop)) {
        if (desc[key] === value) {
            filtered_p.push(prop);
        }
    }

    return filtered_p;
}

/**
 * @brief Function used to go through the prototype chain of the object and
 * yield names of FILTERED properties of the original object and prototypes on
 * its prototype chain.
 * @param {Object} obj The original object which we want to iterate through.
 * @param {Object.<string, boolean>} descriptor Compulsory argument specifiying the filter.
 * The filtration is strict, i.e. if the property is not specified (undefined) by filter, 
 * it will not be shown.
 * @param {String[]} prop_names Array containing original object's properties.
 * @returns Array of FILTERED properties of the original object and prototypes on its prototype chain. 
 * Sorted by the order of the prototype chain - original object's properties are listed last.
 */
function withDescriptor(obj, descriptor, prop_names) { 

    /**
     * @brief If the original object is on the top of the prototype chain,
     * return the array of properties of the original object.
     */
    if (obj === null) {
        return prop_names;
    }

    /**
     * @brief Go through the prototype chain of the object.
     * Filter through the properties of currently iterated object.
     * Concat the existing array after the filtered properties of the
     * currently iterated object.
     */
    while (obj !== null) {
        Object.entries(descriptor).forEach(([key, value]) => {
            let to_concat = filter_properties(obj, key, value);
            prop_names = to_concat.concat(prop_names);
        });
        obj = Object.getPrototypeOf(obj);
    }
    
    return prop_names;
}

/**
 * Function used to go through the prototype chain of the object and
 * yield names of ALL properties of the original object and prototypes on
 * its prototype chain.
 * @param {Object} obj The original object which we want to iterate through.
 * @param {String[]} prop_names Array containing original object's properties. 
 * @returns Array of ALL properties of the original object and prototypes on its prototype chain. 
 * Sorted by the order of the prototype chain - original object's properties are listed last.
 */
function withoutDescriptor(obj, prop_names) {

    /**
     * @brief If the original object is on the top of the prototype chain,
     * return the array of properties of the original object.
     */
    if ((obj) === null) {
        return prop_names;
    }
    
    let current_obj_prop_names = null;

    /**
     * @brief Go through the prototype chain of the object.
     * Concat the existing array after the properties of the
     * currently iterated object.
     */
    while (obj !== null) {
        current_obj_prop_names = Object.getOwnPropertyNames(obj);
        prop_names = current_obj_prop_names.concat(prop_names);

        obj = Object.getPrototypeOf(obj);
    }

    return prop_names;
}

/**
 * @brief Function selects the right filter function to call depending on the descriptor given.
 * If no descriptor is given, the function without_descriptor is called,
 * else the function with_descriptor will be called.
 * @param {Object} obj Object on which the properties will be iterated, 
 * Must not be null or undefined.
 * @param {Object.<string, boolean>} descriptor Optional argument, if not specified, all properties will be shown.
 * The filtration is strict, i.e. if the property is not specified (undefined) by filter, 
 * it will not be shown.
 * @returns Generator which yields properties of the given object.
 */
export function* iterateProperties(obj = undefined, descriptor = {}) {

    /**
     * @brief Error handling
     */
    if (obj === undefined || obj === null) {
        throw new Error('Object has to be defined.');
    }

    let prop_names = [];

    const is_desc_empty = !Object.keys(descriptor).length;

    /**
     * @brief Selects the right function to call depending
     * on the descriptor - if no descriptor is given in arguments,
     * the function without_descriptor is called, else the function
     * with_descriptor will be called.
     */
    if (is_desc_empty) { 
        yield* withoutDescriptor(obj, prop_names);
    } else {
        yield* withDescriptor(obj, descriptor, prop_names);
    }

    return prop_names;
}

/**
 * EoF
 */