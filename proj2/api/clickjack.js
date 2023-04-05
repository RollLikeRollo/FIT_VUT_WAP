/**
 * @file clickjack.js
 * @description This file contains the clickjacking attack simulation.
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

/**
 * Simulates a clickjacking attack by deleting a user from the local storage.
 * Shows the learning text after the attack.
 * @returns 
 */
function clickjack() {

    var after_div = parent.document.getElementById("after-clickjacking");
    after_div.hidden = false;

    var user_in = parent.document.getElementById("username-select-input");
    var user_val = user_in.value;

    if (user_val == "") {
        alert("No user deleted!");
        return;
    }

    var user_list = JSON.parse(localStorage.getItem("username_list"));
    
    user_list = user_list.filter(item => item !== user_val);

    localStorage.setItem("username_list", JSON.stringify(user_list));

    alert("User " + user_val + " has been deleted!");

}