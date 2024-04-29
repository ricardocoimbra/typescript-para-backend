import express from "express";
import PetsController from "../controller/PetsController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router()
const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"));
const petsController = new PetsController(petRepository);

router.post("/", (req, res) => petsController.criaPet(req, res));
router.get("/", (req, res) => petsController.listaPet(req, res));
//router.get("/:id", (req, res) => petsController.listaPet(req, res));
router.put("/:id", (req, res) => petsController.atualizaPet(req, res));
router.delete("/:id", (req, res) => petsController.deletaPet(req, res));

export default router;
