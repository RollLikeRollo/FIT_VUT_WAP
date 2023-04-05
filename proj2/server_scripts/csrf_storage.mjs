/**
 * @file csrf_storage.mjs
 * @description Server side script for CSRF lab.
 * Stores the transactions made in the CSRF lab.
 * @author Jan Zboril <xzbori20@stud.fit.vutbr.cz>
 * @date 2023
 * FIT VUT Brno
 * WAP project 2
 */

var csrf_storage = new Map();

/**
 * Adds the transfer to the list of transfers for the given session ID.
 * @param {*} sessionid  Session ID of the sender.
 * @param {*} amount Amount of money to be transferred.
 * @param {*} to Recipient of the transfer.
 */
export function addTransfer(sessionid, amount, to) {
    if (csrf_storage.has(sessionid)) {
        var transfers = csrf_storage.get(sessionid);
        transfers.push({amount: amount, to: to});
        csrf_storage.set(sessionid, transfers);
    } else {
        csrf_storage.set(sessionid, [{ amount: amount, to: to }]);
    }
};

/**
 * Fetches the list of transfers for the given session ID.
 * @param {*} sessionid Session ID of the sender.
 * @returns Array of transfers whose sender is the given session ID.
 */
export function getTransfers(sessionid) { 
    if (csrf_storage.has(sessionid)) {
        return csrf_storage.get(sessionid);
    } else {
        return [];
    }
};