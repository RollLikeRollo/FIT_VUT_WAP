async function sendReq() {
    // console.log("sendReq");

    var input_box = document.getElementById("search_bar").value;

    var response = await fetch(input_box);
    // console.log(response);
    var data = await response.text();
    console.log(data);

    var temp_doc = '<html><head><title>Reflected XSS</title><link rel="stylesheet" href="/styles/xss_frame.css"><link rel="icon" type="image/x-icon" href="/images/favicon.ico"><script src="/api/xss_reflected_frame.js"></script></head><body><div class="example-controls"><span class="url">URL</span><form action="/xss_reflected/frame" method="GET"><input id="search_bar" class="urlbar" type="text" value=""><input class="urlbutton" type="Submit" value="Go" onclick="sendReq()"></div></body></html>';


    document.open();
    document.write(temp_doc);
    document.close();
    await new Promise(r => setTimeout(r, 150));
    document.open();
    document.write(data);
    document.close();
}

