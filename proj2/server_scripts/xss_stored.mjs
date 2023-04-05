/**
 * @file xss_stored.mjs
 * @description Server side script for the stored XSS lab.
 * Stores the cookies stolen in the stored XSS lab.
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

var stolen_cookies = new Map();

/**
 * 
 * @returns The list of stolen cookies.
 * @param {*} session_id Session ID of which the cookies are returned.
 */
export function getStolenCookies(session_id) {
    if (stolen_cookies.has(session_id)) {
        return stolen_cookies.get(session_id);
    } else {
        return [];
    }
};

/**
 * Adds the cookie to the list of stolen cookies.
 * @param {*} cookie cookie to be added.
 * @param {*} session_id Session ID to whom the cookie belongs.
 */
export function appendStolenCookies(cookie, session_id) { 
    if (stolen_cookies.has(session_id)) {
        var sc = stolen_cookies.get(session_id);
        sc.push(cookie);
        stolen_cookies.set(session_id, sc);
    } else {
        stolen_cookies.set(session_id, [cookie]);
    }
};

/**
 * Clears the list of stolen cookies for the given session ID.
 * @param {*} session_id Session ID to whom the cookies belong.
 */
export function resetStolenCookies(session_id) {
  stolen_cookies.set(session_id, []);
};

/**
 * Reverse the string given as a parameter.
 * @param {*} str String to be reversed.
 * @returns  Reversed string.
 */
export function reverseString(str) {
    return str.split("").reverse().join("");
};