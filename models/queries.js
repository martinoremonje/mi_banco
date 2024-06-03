import { pool } from "../config/db.js";

const addAcountQueries = async(number, balance)=>{
    try {
        const sql ={
            text:"INSERT INTO cuenta (number_account, balance) VALUES ($1, $2) returning *",
            values : [number, balance]
        }
        const res = await pool.query(sql);
        if(res.rowCount > 0){
            return res.rows[0];
        }else{
            return new Error("error al insertar el numero de cuenta");
        }
    } catch (error) {
        console.log("query error", error.code, "error.message", error.message);
    }
}

const addTransferQueries = async(description, amount, debit_account, credit_acount)=>{
    //registro de la transferencia
    const newTransfer ={
        text: "INSERT INTO transferencias (description, amount, debit_account, credit_acount) values ($1, $2, $3, $4) returning *",
        values: [description, amount, debit_account, credit_acount]
    }

    //actualizar cuenta origen
    const updateCuentaOrigen = {
        text: "UPDATE cuenta SET balance = balance - $1 where number_account = $2 returning *",
        values: [amount, debit_account]
    }

    //actualizar cuenta destino
    const updateCuentaDestino = {
        text: "UPDATE cuenta SET balance = balance + $1 where number_account = $2 returning *",
        values: [amount, credit_acount]
    }

try {
    await pool.query('begin')
    const response = await pool.query(newTransfer);
    const debitar = await pool.query(updateCuentaOrigen);
    const creditar = await pool.query(updateCuentaDestino);
    await pool.query('commit')
    console.log("ultima transaccion ", response.rows[0]);

} catch (error) {
    await pool.query('rollback')
    console.log("query- transferencias error", error.code, "error.message", error.message);
}

}

export {addAcountQueries, addTransferQueries};