type INote = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type INotes = INote[];

type NotesAPiResponse = {
  limit: number;
  skip: number;
  totalPages: number;
  totalNotes: number;
  notes: INotes;
};

type ISuccessApiResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
};

type IErrorApiResponse = {
  success: boolean;
  message: string;
  statusCode: number;
};

type Note = {
  title: string;
  content: string;
  noteId: string;
};

export type {
  INote,
  ISuccessApiResponse,
  IErrorApiResponse,
  INotes,
  NotesAPiResponse,
  Note,
};
