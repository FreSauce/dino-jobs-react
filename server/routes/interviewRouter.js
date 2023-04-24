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

router.post("/compile", async (req, res, next) => {
  console.log("hit compile");
  const { code, language } = req.body;
  try {

    const result = await eval(code.text, language);
    console.log(result)
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    next({ status: 500, message: err })
  }
})

module.exports = router;
