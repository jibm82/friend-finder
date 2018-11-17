const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.send("Sanity Check");
});

module.exports = router;