import express from "express";
const router = express.Router();

router.get("/signup",(req,res) => {
    res.send("Signup endpoint")
});
router.get("/login",(req,res) => {
    res.send("login endpoint")
});
router.get("/logout",(req,res) => {
    res.send("logout endpoint")
});


// router.put("/update-profile",protectRoute,updateProfile);
// router.get("/check",protectRoute,(req,res) => {
//     res.status(200).json(req.user);
// })

export default router;
