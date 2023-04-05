/**
 * @file vulnerable.js
 * @description Logic for the lab - vulnerable bank page
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */


/**
 * Fetches the transfers from the server and displays them in the page.
 * Transfers are tied to Session ID.
 */
async function fetchTranfers() {

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
        var this_transfer = document.createElement('div');
        this_transfer.innerHTML = 'Transfer amount: ' + amount + ' $, to: ' + to;
        console.log(this_transfer.innerHTML);
        document.getElementById('fetch-transfers-c').appendChild(this_transfer);
    }

}