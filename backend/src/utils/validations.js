import Joi from "joi";

const noteSchema = Joi.object({
  title: Joi.string().required().min(10).max(100),
  content: Joi.string().required().min(20).max(500),
});

const updateNoteSchema = Joi.object({
  title: Joi.string().min(10).max(100),
  content: Joi.string().min(20).max(500),
});

export const validateNote = (note) => noteSchema.validate(note);

export const validateUpdateNote = (note) => updateNoteSchema.validate(note);
