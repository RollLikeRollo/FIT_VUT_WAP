/**
 * @file xss_reflected_frame.js
 * @description Logic for the frame in reflected XSS lab
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

/**
 * Sends a request to the server.
 * Reqest contains the value of the input box.
 * The response is a HTML page with the request's input box value in the text.
 * Replace the current page with the response.
 */
async function sendReqXSS() {

    var input_box = document.getElementById("search_bar").value;
    var response = await fetch(input_box);
    var data = await response.text();
 
    document.open();
    document.write(data);
    document.close();
}

