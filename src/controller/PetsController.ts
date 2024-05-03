import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

//let listaDePets: TipoPet[] = [];
let listaDePets: Array<TipoPet> = [];

let id: number = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    constructor(private repository: PetRepository) {
    }
    async criaPet(req: Request, res: Response) {
      const { adotado, especie, dataDeNascimento, nome } = <PetEntity>req.body;

      if (!Object.values(EnumEspecie).includes(especie)) {
        return res.status(400).json({ error: "Especie inválida" });
      }

      const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);

      await this.repository.criaPet(novoPet);
      return res.status(201).json(novoPet);
    }

    async listaPet(req: Request, res: Response) {
      const listaDePets = await this.repository.listaPet();
      return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response) {
      const { id } = req.params;
      const { success, message } = await this.repository.atualizaPet(
          Number(id),
          req.body as PetEntity
      );
      // const { nome, dataDeNascimento, especie, adotado } = req.body as TipoPet;
      // const pet = listaDePets.find((pet) => pet.id === Number(id));
      if (!success) {
        return res.status(404).json({ message });
      }
      // pet.nome = nome;
      // pet.dataDeNascimento = dataDeNascimento;
      // pet.especie = especie;
      // pet.adotado = adotado;
      return res.sendStatus(204);
    }

    deletaPet(req: Request, res: Response) {
      const { id } = req.params;
      const pet = listaDePets.find((pet) => pet.id === Number(id));
      if (!pet) {
        return res.status(400).json({ mensagem: "Pet não encontrado" });
      }
      const indice = listaDePets.indexOf(pet);
      listaDePets.splice(indice, 1);
      return res.status(204).json();
    }
  }

