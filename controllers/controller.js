import { addAcountQueries, addTransferQueries } from "../Modulos/queries.js";

export const home = (req, res) => {
    res.send('hello world');
}

export const addAccount = async (req, res) => {
    try {
        const { number, balance } = req.body;
        console.log(req.body)
        const result = await addAcountQueries(number, balance);
        res.send(result);
    } catch (error) {
        console.log("controller error", error.code, "error.message", error.message);
    }
}

export const addTransfer = async (req, res) => {
    try {
        const { description, amount, debit_account, credit_acount } = req.body;
        const result = await addTransferQueries(description, amount, debit_account, credit_acount);
        res.send(result);
    } catch (error) {
        console.log("controller error", error.code, "error.message", error.message);
    }
}
