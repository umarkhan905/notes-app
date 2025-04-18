import { errorResponse } from "../utils/api-response.js";

const addNote = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in addNote: ", error);
    return res.status(500).json(errorResponse());
  }
};

const updateNote = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in updateNote: ", error);
    return res.status(500).json(errorResponse());
  }
};

const deleteNote = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in deleteNote: ", error);
    return res.status(500).json(errorResponse());
  }
};

const getAllNotes = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in getAllNotes: ", error);
    return res.status(500).json(errorResponse());
  }
};

const getNoteById = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in getNoteById: ", error);
    return res.status(500).json(errorResponse());
  }
};

export { addNote, updateNote, deleteNote, getAllNotes, getNoteById };
