
var csrf_storage = new Map();

export function addTransfer(sessionid, amount, to) {
    if (csrf_storage.has(sessionid)) {
        var transfers = csrf_storage.get(sessionid);
        transfers.push({amount: amount, to: to});
        csrf_storage.set(sessionid, transfers);
        console.log(csrf_storage.get(sessionid));
    } else {
        csrf_storage.set(sessionid, [{ amount: amount, to: to }]);
        console.log(csrf_storage.get(sessionid));
    }
}

export function getTransfers(sessionid) { 
    if (csrf_storage.has(sessionid)) {
        console.log(csrf_storage.get(sessionid));
        return csrf_storage.get(sessionid);
    } else {
        return [];
    }
}