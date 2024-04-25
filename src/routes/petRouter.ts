import express from "express";
import PetsController from "../controller/PetsController";

const router = express.Router()

const petsController = new PetsController();

router.post("/", petsController.criaPet);
router.get("/", petsController.listaPet);
//router.get("/:id", petsController.listaPet);
router.put("/:id", petsController.atualizaPet);
router.delete("/:id", petsController.deletaPet);

export default router;