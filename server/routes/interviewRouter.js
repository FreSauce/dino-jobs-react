const { Router } = require("express");
const router = Router();

const offers = {};

router.post("/:interviewId", (req, res) => {
  const { interviewId } = req.params;
  const { offer, from, init } = req.body;
  console.log("hit post", offer);
  if (init) {
    offers[interviewId] = {};
  }
  offers[interviewId] = { ...offers[interviewId], [from]: offer };
  res.send("ok");
});

router.get("/:interviewId", (req, res) => {
  console.log("hit get");
  const { interviewId } = req.params;
  res.send(offers[interviewId]);
});

module.exports = router;
