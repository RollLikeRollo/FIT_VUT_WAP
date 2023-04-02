function clickjack() {

    // localStorage.setItem("clickjacked", true);

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