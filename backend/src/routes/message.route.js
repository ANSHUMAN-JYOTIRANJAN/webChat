import express from "express";
const router = express.Router();

router.get("/msg",(req,res) => {
    res.send("message is get from server");
});
router.get("/contacts",(req,res) => {
    res.send("contacts is get from server");
});
router.get("/:id",(req,res) => {
    res.send(" user Id  get from server");
})
router.get("/send/:id",(req,res) => {
    res.send("sender details are  gets from server");
})

export default router;

