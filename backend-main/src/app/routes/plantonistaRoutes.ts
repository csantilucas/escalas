// src/routes/plantonistaRoutes.ts
import { Router } from "express";
import { PlantonistaController } from "../controler/plantonistaControler.js";
import { authMiddleware } from "../../containers/auth.container.js";

const router = Router();
const plantonista = new PlantonistaController();


router.post("/", authMiddleware.auth, authMiddleware.authAdmin, plantonista.create);
router.get("/", authMiddleware.auth,plantonista.getAll); 
router.get("/user/:userId", authMiddleware.auth, authMiddleware.authAdmin, plantonista.getByUserId); 

export default router;