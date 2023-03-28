import { Router } from "express";

import {
  signInGet,
  googleAuth,
  googleAuthCb,
  facebookAuth,
  facebookAuthCb,
} from "../../controllers/users.controller";

const router = Router();

router.get("/sign-in", signInGet);
router.get("/google", googleAuth);
router.get("/google/cb", googleAuthCb);
router.get("/facebook", facebookAuth);
router.get("/facebook/cb", facebookAuthCb);

export default router;
