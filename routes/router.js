import express from 'express';
import { home, addAccount, addTransfer } from "../controllers/controller.js";
const router = express.Router();

router.get("/", home);

router.post("/addAccount", addAccount);

router.post("/addTransfer", addTransfer);

export default router;