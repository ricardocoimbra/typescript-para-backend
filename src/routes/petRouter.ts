import express from "express";
import PetsController from "../controller/PetsController";

const router = express.Router()

const petsController = new PetsController();

router.post("/", petsController.criaPet);

export default router;