async function dropUsers(collection) {
    let results = await fetch(`/api/drop_users`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            'collection': collection
        })
      }).then(resp => resp.json());
    console.log(results);
}