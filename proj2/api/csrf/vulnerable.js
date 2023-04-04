async function fetchTranfers(){

    const response = await fetch('/api/transfers', { method: 'GET' });
    
    const transfers = await response.json();

    if (transfers.length == 0) {
        document.getElementById('fetch-transfers-c').innerHTML = 'No transfers exist!';
        return;
    }

    document.getElementById('fetch-transfers-c').innerHTML = '';
    for (const transfer of transfers) {
        var amount = transfer.amount;
        var to = transfer.to;        
        
        var thisTransfer = document.createElement('div');
        thisTransfer.innerHTML = 'Transfer amount: ' + amount + ' $, to: ' + to;
        console.log(thisTransfer.innerHTML);
        document.getElementById('fetch-transfers-c').appendChild(thisTransfer);
    }

}