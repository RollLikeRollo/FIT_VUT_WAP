// on page load get session id
// app.get('/api/session', (req, res) => {
//     res.json({ session: req.sessionID });

//     console.log(req.sessionID);
//     console.log(req.session);
//     console.log(req.session.cookie);
//     console.log(req.session.cookie.maxAge);
//     console.log(req.session.cookie.expires);


// });


let results = await fetch(`/api/get_session`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  }).then(resp => resp.json());
console.log(results);

let p = document.getElementById("session-p");
p.textContent = "session id: " + results.session;