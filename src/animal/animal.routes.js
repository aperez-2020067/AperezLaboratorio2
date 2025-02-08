import { Router } from "express";
import { addAnimal, getAnimals, getAnimal } from "./animal.controller.js";
import {  saveAnimalValidator } from "../../helpers/validators.js";

const api = Router();

// Rutas 
api.post("/animalregister", [saveAnimalValidator] , addAnimal);
api.get("/animalall", getAnimals);
api.get("/animal/:id", getAnimal);

export default api;
