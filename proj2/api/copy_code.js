function copyCode(elem) { 
    var copyText = document.getElementById(elem);
    navigator.clipboard.writeText(copyText.textContent);
}