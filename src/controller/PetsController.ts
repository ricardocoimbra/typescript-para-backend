import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

//let listaPets: TipoPet[] = [];
let listaPets: Array<TipoPet> = [];

export default class PetsController {
    criaPet(req: Request, res: Response) {
        //const novoPet = req.body as TipoPet;
        const { id, adotado, especie, idade, nome } = <TipoPet>req.body;
        const novoPet: TipoPet = {id, adotado, especie, idade, nome}
        listaPets.push(novoPet);
        return res.status(201).json(novoPet);
    }
}