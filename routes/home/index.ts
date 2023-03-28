import { home } from "../../controllers/home.controller";
import { Router } from "express";

const router = Router();

router.get("/", home);
router.post("/", home);

export default router;
