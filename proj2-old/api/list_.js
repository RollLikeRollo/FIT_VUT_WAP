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

    if (results.err) {
        console.error(results.err + '!!!');
        p = document.getElementById("usr-created-note");
        p.textContent = results.err;
        p.classList.add("err-note");
        p.classList.remove("success-note");
    } else { 
        p = document.getElementById("usr-created-note");
        p.textContent = "User created!";
        p.classList.add("success-note");
        p.classList.remove("err-note");
    }
});
