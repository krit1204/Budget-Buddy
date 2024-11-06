const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//add transaction using POST method
router.post("/add-transaction", addTransaction);

//Edit transaction using POST method
router.post("/edit-transaction", editTransaction);

//Delete transaction using POST method
router.post("/delete-transaction", deleteTransaction);

//get transactions using POST method
router.post("/get-transaction", getAllTransaction);

module.exports = router;