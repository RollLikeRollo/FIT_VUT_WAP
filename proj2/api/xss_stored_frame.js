
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

async function attackerFrameRefresh() { 
    while (true) {
        await new Promise(r => setTimeout(r, 5000));
        parent.document.getElementById('attacker-frame').contentWindow.location.reload();        
    }
}



async function getSessionList() { 
    // let u = JSON.parse(localStorage.getItem("comment_list"));
    // return u;

    let r = fetch("xss_stored_get_comments", {
    }).then(response => { 
        if (response.status === 200) {
            return response.json();
        } else {
            console.log("ERROR");
        }
    });

    return r;
};

async function resetPage() { 
    console.log("resetPage");
    localStorage.clear();
    list = ["Trees are angry!", "Fangorn is on fire!", "The Ents are coming!"];
    localStorage.setItem("comment_list", JSON.stringify(list));
    await loadComments();
    fetch("/api/xss_stored_reset");
};

async function addComment() {
    const comment = document.getElementById("comment-area").value;
    console.log(comment);

    if (comment === "") {
        alert("Comment cannot be empty!");
        return;
    }

    // let u = getSessionList();
    // u.push(comment);

    localStorage.setItem("comment_list", JSON.stringify(u));

    fetch("xss_stored_add_comment", {
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(comment),
        method: "POST"
    }
    ).then(response => {
        if (response.status === 200) {
            console.log("OK");
            console.log(response.json());
        } else {
            console.log("ERROR");
        }
    });
    
    comment.value = '';
    await loadComments();
    alert("Comment added!");

    // console.log(document.cookie);
    
}

async function loadComments() { 
    let u = await getSessionList();
    console.log(u);
    let comments = document.getElementById("comments");
    comments.innerHTML = "";

    let v = [];
    for( let i = 0; i < u.length; i++) { 
        v[i] = false;
        if ('<script>' === u[i].substring(0, 8)) { 
            console.log("script detected");
            v[i] = true;
            u[i] = u[i].substring(8, u[i].length - 9);
        }
    }


    for (let i = u.length-1; i >= 0; i--) {
        let comment = document.createElement("div");
        comment.appendChild(document.createTextNode("Comment " + (u.length - (i)) + ":"));
        comment.appendChild(document.createElement("br"));
        if (v[i]) {
            let s = document.createElement("script");
            console.log(u[i]);
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

function addScript( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.body.appendChild( s );
  }
