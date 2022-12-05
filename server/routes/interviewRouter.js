const { Router } = require("express");
const router = Router();
const { eval } = require("../utils/compile")

// const offers = {};

// router.post("/:interviewId", (req, res) => {
//   const { interviewId } = req.params;
//   const { offer, from, init } = req.body;
//   console.log("hit post", offer);
//   if (init) {
//     offers[interviewId] = {};
//   }
//   offers[interviewId] = { ...offers[interviewId], [from]: offer };
//   res.send("ok");
// });

// router.get("/:interviewId", (req, res) => {
//   console.log("hit get");
//   const { interviewId } = req.params;
//   res.send(offers[interviewId]);
// });

router.post("/compile", (req, res) => {
  console.log("hit compile");
  console.log(req.body);
  const { code, language } = req.body;
  const result = eval(code.text, language);
  res.send(JSON.stringify(result));
})

module.exports = router;
