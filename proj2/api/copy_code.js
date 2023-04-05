/**
 * @file copy_code.js
 * @description Logic for copying code snippets to clipboard.
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */


/**
 * Copies the code snippet to clipboard.
 * @param {string} elem ID of the element containing the code snippet.
 */
function copyCode(elem) { 
    var copyText = document.getElementById(elem);
    navigator.clipboard.writeText(copyText.textContent);
}