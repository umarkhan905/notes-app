import { errorResponse, successResponse } from "../utils/api-response.js";
import { validateNote, validateUpdateNote } from "../utils/validations.js";
import Note from "../models/note.model.js";

const addNote = async (req, res) => {
  try {
    const { error, value } = validateNote(req.body);
    if (error) {
      return res
        .status(400)
        .json(errorResponse(400, error.message.replaceAll('"', "")));
    }

    const note = await Note.create(value);
    if (!note) {
      return res
        .status(500)
        .json(errorResponse(500, "Something went wrong while creating note"));
    }

    return res
      .status(201)
      .json(successResponse(201, "Note created successfully", note));
  } catch (error) {
    console.log("Error in addNote: ", error);
    return res.status(500).json(errorResponse());
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;
    if (!(title || content)) {
      return res
        .status(400)
        .json(
          errorResponse(
            400,
            "Please provide at least title or content to update note"
          )
        );
    }

    const { error, value } = validateUpdateNote({ title, content });
    if (error) {
      return res
        .status(400)
        .json(errorResponse(400, error.message.replaceAll('"', "")));
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json(errorResponse(404, "Note not found"));
    }

    note.title = value.title || note.title;
    note.content = value.content || note.content;

    await note.save();

    return res
      .status(200)
      .json(successResponse(200, "Note updated successfully", note));
  } catch (error) {
    console.log("Error in updateNote: ", error);
    return res.status(500).json(errorResponse());
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(404).json(errorResponse(404, "Note not found"));
    }

    return res
      .status(200)
      .json(successResponse(200, "Note deleted successfully"));
  } catch (error) {
    console.log("Error in deleteNote: ", error);
    return res.status(500).json(errorResponse());
  }
};

const getAllNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const query = { title: { $regex: search, $options: "i" } };
    const notes = await Note.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limit);

    if (!notes.length) {
      return res.status(404).json(errorResponse(404, "Notes not found"));
    }

    return res.status(200).json(
      successResponse(200, "Notes fetched successfully", {
        notes,
        totalNotes,
        totalPages,
        skip,
        limit,
      })
    );
  } catch (error) {
    console.log("Error in getAllNotes: ", error);
    return res.status(500).json(errorResponse());
  }
};

const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json(errorResponse(404, "Note not found"));
    }

    return res
      .status(200)
      .json(successResponse(200, "Note fetched successfully", note));
  } catch (error) {
    console.log("Error in getNoteById: ", error);
    return res.status(500).json(errorResponse());
  }
};

export { addNote, updateNote, deleteNote, getAllNotes, getNoteById };
