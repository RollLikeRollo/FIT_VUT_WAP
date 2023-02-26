function fetchList() {
    const myList = document.getElementById("usr-list");

    fetch("/api/users.json")
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        to_delete = document.getElementsByClassName("gen-list");
        while (to_delete.length > 0) { 
            to_delete[0].parentNode.removeChild(to_delete[0]);
        }


        for (const user of data.users) {
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
    })
    .catch((error) => {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
        document.body.insertBefore(p, myList);
    });
}

const form = document.getElementById("user-add-form");
form.addEventListener('click', (e) => {
    // Store reference to form to make later code easier to read
    const forme = e.target;

    console.log(form['username'].value);

    let usr = form['username'].value;
       
    let data = {
        username: usr
    }

    savePersonToPublicFolder(data, function (err) {
        if (err) {
            res.status(404).send('User not saved');
            return;
        }
        
        // Prevent the default behavior of the form
        e.preventDefault();
    });

    function savePersonToPublicFolder(data, callback) {
        fs.writeFile('/api/users.json', JSON.stringify(data), callback);
    }
});

