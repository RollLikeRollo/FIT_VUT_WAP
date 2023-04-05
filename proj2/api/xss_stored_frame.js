/**
 * @file xss_stored_frame.js
 * @description Logic for the frame in the stored XSS lab
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

/**
 * Loads the comments from the local storage.
 * Shows the comments in the comment section.
 * Adds the listener to the "reset lab" button.
 * Starts the cycle of refreshing the attacker frame.
 */
window.onload = async function () {

    var add_comment_button = document.getElementById("add-comment-button");
    add_comment_button.addEventListener("click", addComment);

    u = getSessionList();
    if (u === null) {
        list = ["Trees are angry!", "Fangorn is on fire!", "The Ents are coming!"];
        localStorage.setItem("comment_list", JSON.stringify(list));
    }

    loadComments();

    var reset_button = parent.document.getElementById("reset-button");
    reset_button.addEventListener("click", resetPage);

    await attackerFrameRefresh();

};

/**
 * Refreshes the attacker frame every 5 seconds.
 */
async function attackerFrameRefresh() { 
    while (true) {
        await new Promise(r => setTimeout(r, 5000));
        parent.document.getElementById('attacker-frame').contentWindow.location.reload();        
    }
};

/**
 * Refreshes the attacker frame once.
 */
async function attackerFrameRefreshOnce() { 
    parent.document.getElementById('attacker-frame').contentWindow.location.reload();        
};

/**
 * 
 * @returns The list of comments from the local storage.
 */
function getSessionList() { 
    let u = JSON.parse(localStorage.getItem("comment_list"));
    return u;
};

/**
 * Resets the lab.
 * Clears the local storage.
 * Sets the default comments.
 * Refreshes the attacker frame.
 * Sends a request to the server to reset the cookies 
 *      stored on the server which are later rendered in the attacker frame.
 * Show the note that the lab was reset.
 */
async function resetPage() { 
    localStorage.clear();
    list = ["Trees are angry!", "Fangorn is on fire!", "The Ents are coming!"];
    localStorage.setItem("comment_list", JSON.stringify(list));
    attackerFrameRefreshOnce();
    await loadComments();

    fetch("/api/xss_stored_reset");

    resetNotes();
};

/**
 * Creates a new comment.
 * Adds the comment to the local storage. - simulation of the database on the server
 * Refreshes the comment section.
 */
async function addComment() {
    const comment = document.getElementById("comment-area").value;

    if (comment === "") {
        alert("Comment cannot be empty!");
        return;
    }

    let u = getSessionList();
    u.push(comment);

    localStorage.setItem("comment_list", JSON.stringify(u));
    
    comment.value = '';
    await loadComments();
    alert("Comment added!");
    
};

/**
 * !!!!!!!! Funtcion is intentionally vulnerable to XSS !!!!!!!!
 *
 * Loads the comments from the local storage which simulates the database on the server.
 * Comments are shown in the comment section.
 * 
 * If the comment starts with "<script>" it is considered a script and is executed.
 * This intentionally allows to bypass the escaping of the html <script> tag.
 * Comments are stored as strings in the local storage. When the comment is loaded
 * from the local storage it is shown as a text, even if it contains HTML tags.
 * This function strips the comments including the <script> tag and pastes them
 * into the HTML as a script. The script is then executed. This is done to 
 * simulate the XSS attack.
 */
async function loadComments() {

    let u = getSessionList();
    let comments = document.getElementById("comments");
    comments.innerHTML = "";

    // strip beginning and trailing whitespace
    u = u.map(x => x.trim());

    // check if the comment is a script
    // if it is, strip the <script> tag and set the flag to true
    let v = [];
    for( let i = 0; i < u.length; i++) { 
        v[i] = false;
        if ('<script>' === u[i].substring(0, 8)) { 
            v[i] = true;
            u[i] = u[i].substring(8, u[i].length - 9);
        }
    }

    // create the comment divs
    // if the comment is a script (script flag is set from earlier), 
    // create a script element and paste the comment contents into it
    for (let i = u.length-1; i >= 0; i--) {
        let comment = document.createElement("div");
        comment.appendChild(document.createTextNode("Comment " + (u.length - (i)) + ":"));
        comment.appendChild(document.createElement("br"));
        if (v[i]) {
            let s = document.createElement("script");
            s.innerHTML = u[i];
            comment.appendChild(s);
        } else { 
            comment.appendChild(document.createTextNode(u[i]));
        }
        comment.appendChild(document.createElement("br"));
        comment.appendChild(document.createElement("br"));
        comments.appendChild(comment);
    }
    return;
};


/**
 * Shows the note that the lab was reset.
 */
async function resetNotes() { 
    var s = parent.document.getElementById('reset-button-sec');
    s.style.display = "block";
    s_ch = s.children;
    s_ch[0].textContent = "Reset successful!";
    s_ch[0].style.display = 'block'
    s_ch[0].classList.add('success-note');
    s_ch[1].textContent = 'OK';
    s_ch[1].style.display = 'block'
};

/**
 * Hides the note that the lab was reset.
 */
async function resetNotesClose() {
    var s = parent.document.getElementById('reset-button-sec');
    s.style.display = "none";
    s_ch = s.children;
    s_ch[0].style.display = 'none'
    s_ch[1].style.display = 'none'
};