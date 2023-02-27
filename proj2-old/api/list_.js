async function fetchList() {
    console.log("fetching list");
    let results = await fetch(`/api/list_users/`).then(resp => resp.json());
    console.log(results);

    const myList = document.getElementById("usr-list");

    to_delete = document.getElementsByClassName("gen-list");
    while (to_delete.length > 0) { 
        to_delete[0].parentNode.removeChild(to_delete[0]);
    }

    for (const user of results) {
        const listItem = document.createElement("li");
        listItem.className = "gen-list";
    
        const nameElement = document.createElement("strong");
        nameElement.textContent = user.username;
        
        listItem.append(
            nameElement
            // ` can be found in ${product.Location}. Cost: `,
            // priceElement,
        );
        myList.appendChild(listItem);
    }

};

const btn = document.getElementById("user-created-button");
btn.addEventListener('click', async (e) => { 
    let sec = document.getElementById("usr-created-sec");
    sec.style.display = "none";
});


const form = document.getElementById("user-add-button");
form.addEventListener('click', async (e) => { 
    const form = document.getElementById("user-add-form");
    console.log(form['username'].value);

    let re = new RegExp("^[a-zA-Z0-9]+$");
    if (!re.exec(form['username'].value)) {
        console.error("Invalid username");
        return;
    }

    let results = await fetch(`/api/add_user`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username: form['username'].value
        })
      }).then(resp => resp.json());
    console.log(results);

    console.error(results.err + '!!!');
    s = document.getElementById("usr-created-sec");
    s.style.display = "block";
    s_ch = s.children;
    s_ch[0].textContent = results.err;
    s_ch[1].textContent = 'OK';
    if(s_ch[1].style.display === "none"){
        s_ch[1].style.display = "block";
    };

    if (results.err) {
        s_ch[0].classList.remove("success-note");
        s_ch[0].classList.add("err-note");
    } else { 
        s_ch[0].textContent = "User " + form['username'].value + " created!";
        s_ch[0].classList.remove("err-note");
        s_ch[0].classList.add("success-note");
    }
});
