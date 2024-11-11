import express from "express";
import { addLivro, deleteLivro, getLivros, updateLivro, updateStatus} from "../controllers/livrosController.js";

const router = express.Router()

router.get("/", getLivros)

router.post("/", addLivro)

router.put("/:id", updateLivro)

router.put("/:id/status", updateStatus)

router.delete("/:id", deleteLivro)

export default router