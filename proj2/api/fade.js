/**
 * @file fade.js
 * @description Logic for fading animation between specific divs.
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

/**
 * Fades between the divs with class fadeMe.
 * @param {number} number Number of the div to hide. Div with number + 1 will be shown.
 */
async function fade(number) {
    console.log("fade");
    var fade_elems = document.getElementsByClassName("fadeMe");
    
    console.log(fade_elems);

    fade_elems[(number) % fade_elems.length].hidden = true;
    fade_elems[(number + 1) % fade_elems.length].hidden = false;
    sessionStorage.setItem("active_fade_xss", (number + 1) % fade_elems.length);
}