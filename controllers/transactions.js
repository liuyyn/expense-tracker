const Transaction = require("../models/Transaction");

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = (req, res, next) => {
  //   res.send("GET transactions");
  Transaction.find()
    .then((transactions) =>
      res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
      })
    )
    .catch((e) =>
      res.send(500).json({
        succes: false,
        error: "Server Error",
      })
    );
};

// @desc    Add a transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransactions = async (req, res, next) => {
  //   res.send("POST transactions");
  const newTransaction = new Transaction({
    text: req.body.text,
    amount: req.body.amount,
  });

  newTransaction
    .save()
    .then((transaction) =>
      res.status(201).json({
        success: true,
        count: transaction.length,
        data: transaction,
      })
    )
    .catch((e) => {
      if (e.name === "ValidationError") {
        const messages = Object.values(e.errors).map((val) => val.message); // put all messages into an array

        return res.status(400).json({ success: false, error: messages });
      } else {
        res.send(500).json({
          succes: false,
          error: "Server Error",
        });
      }
    });
};

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions
// @access  Public
exports.deleteTransactions = async (req, res, next) => {
  //   res.send("DELETE transactions");
  Transaction.findById(req.params.id)
    .then((transaction) =>
      transaction.remove().then(() => {
        if (!transaction) {
          return res.status(404).json({
            sucess: false,
            error: "No transaction found",
          });
        }

        res.status(200).json({ sucess: true, data: transaction });
      })
    )
    .catch((e) => {
      res.send(500).json({
        succes: false,
        error: "Server Error",
      });
    });
};
