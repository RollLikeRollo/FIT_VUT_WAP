/***
 * XSS Stored
 */


var stolen_cookies = [];
var comments = [];

export function getStolenCookies() {
    return stolen_cookies;
}

export function appendStolenCookies(cookie) { 
    if (!stolen_cookies.includes(cookie)) {
        stolen_cookies.push(cookie);
    }
}

export function resetStolenCookies() {
  stolen_cookies = [];
}

export function appendComment(comment) { 
    comments.push(comment);
    return comments;
};

export function getComments() { 
    return comments;
};

export function reverseString(str) {
    return str.split("").reverse().join("");
}