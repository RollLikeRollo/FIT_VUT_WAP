async function fetchList() {
   
    let users = await getSessionList();

    const newTable = document.createElement("table");
    newTable.innerHTML = "<thead><th>Username</th></thead>";
    for(let i = 0; i < users.length; i++){
        let row = newTable.insertRow();
        let cell = row.insertCell();
        cell.textContent = users[i];
    } 
    let title = document.createElement("p");
    title.textContent = "User list:";

    const oldTable = document.getElementById("usr-list");
    while (oldTable.firstChild) {
        oldTable.removeChild(oldTable.lastChild);
    }
    oldTable.appendChild(title)
    oldTable.appendChild(newTable);
};

async function hideList() { 
    let oldTable = document.getElementById("usr-list");
    while (oldTable.firstChild) {
        oldTable.removeChild(oldTable.lastChild);
    }
};

window.onload = function () {
    // sessionStorage.clear();
    u = getSessionList();
    if (u === null) {
        list = ["PaulAtreides", "DukeLeto", "GurneyHalleck"]
        sessionStorage.setItem("username_list", JSON.stringify(list));
    }

    // username select autocomplete
    const autocomplete_field = document.getElementById("username-select-input");
    // console.log(autocomplete_field);
    autocomplete_field.addEventListener("click", autocomplete(autocomplete_field));

    const slider_obj = document.getElementById("slide-clickjacking-slider");
    slider_obj.addEventListener("input", sliderFunc);
}



async function sliderFunc() {
    const slider_obj = document.getElementById("slide-clickjacking-slider");
    const val = slider_obj.value;

    const iframe = document.getElementById("clickjacking-iframe-obj");


    // console.log(val);
    iframe.style.opacity = val/100;
}

async function makeDefault() {
    console.log("makeDefault");
    sessionStorage.clear();
    list = ["PaulAtreides", "DukeLeto", "GurneyHalleck"]
    sessionStorage.setItem("username_list", JSON.stringify(list));
    fetchList();

}

function getSessionList() { 
    let u = JSON.parse(sessionStorage.getItem("username_list"));
    return u;
};

const btn = document.getElementById("user-created-button");
btn.addEventListener('click', async (e) => { 
    let sec = document.getElementById("usr-created-sec");
    const form = document.getElementById("user-add-form");
    form.reset();
    sec.style.display = "none";
});




const form = document.getElementById("user-add-button");
form.addEventListener('click', async (e) => {
    const form = document.getElementById("user-add-form");
    console.log(form['username'].value);

    let err_bool = false;
    let err_msg;
    let re = new RegExp("^[a-zA-Z0-9]+$");
    if (!re.exec(form['username'].value)) {
        console.error("Invalid username");
        err_bool = true;
        err_msg = "Invalid username";
        // return;
    } else {
        let users = getSessionList();
        if (users === null) {
            users = [form['username'].value];
            sessionStorage.setItem("username_list", JSON.stringify(users));
        } else {
            if (users.includes(form['username'].value)) {
                err_bool = true;
                err_msg = "User already exists";
                // return;
            } else {
                users.push(form['username'].value);
                sessionStorage.setItem("username_list", JSON.stringify(users));
            }
        }
    }

    s = document.getElementById("usr-created-sec");
    s.style.display = "block";
    s_ch = s.children;
    s_ch[0].textContent = "";
    s_ch[0].style.display = 'block'
    s_ch[1].textContent = 'OK';
    if(s_ch[1].style.display === "none"){
        s_ch[1].style.display = "block";
    };

    if (err_bool) {
        s_ch[0].classList.remove("success-note");
        s_ch[0].classList.add("err-note");
        s_ch[0].textContent = "Error: " + err_msg;
    } else { 
        s_ch[0].textContent = "User " + form['username'].value + " created!";
        s_ch[0].classList.remove("err-note");
        s_ch[0].classList.add("success-note");
    }

    // to update the list
    fetchList();
});



// from https://www.w3schools.com/howto/howto_js_autocomplete.asp
// changed a bit
async function autocomplete(inp) {

    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        arr = getSessionList();
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);

  });
  }


