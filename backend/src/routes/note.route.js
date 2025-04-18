import { Router } from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/note.controller.js";

const router = Router();

router.post("/", addNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);
router.get("/", getAllNotes);
router.get("/:noteId", getNoteById);

export default router;
