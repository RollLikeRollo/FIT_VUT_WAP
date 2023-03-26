async function fade(number) {
    console.log("fade");
    var fade_elems = document.getElementsByClassName("fadeMe");
    
    console.log(fade_elems);

    fade_elems[(number) % fade_elems.length].hidden = true;
    fade_elems[(number+1) % fade_elems.length].hidden = false;
}