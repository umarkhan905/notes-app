import { useState, useEffect } from "react";
import Container from "@/components/Container";
import Navbar from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteCard from "@/components/home/notes/NoteCard";
import NoteModal from "@/components/home/modal/NoteModal";
import axiosInstance from "@/lib/axios";
import {
  ISuccessApiResponse,
  IErrorApiResponse,
  NotesAPiResponse,
  Note,
} from "@/types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ApiError from "@/components/error/ApiError";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
    noteId: "",
  });
  const [data, setData] = useState<NotesAPiResponse>({
    limit: 0,
    skip: 0,
    totalPages: 0,
    totalNotes: 0,
    notes: [],
  });

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get<
        ISuccessApiResponse<NotesAPiResponse>
      >(`/notes?limit=9&page=${page}`);
      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        setData(data.data);
      }
    } catch (error) {
      console.log("error while fetching notes", error);
      const axisError = error as AxiosError<IErrorApiResponse>;
      setError(axisError.response?.data.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleNoteChange = (note: Note) => {
    setNote(note);
  };

  const onDeleteNote = async (noteId: string) => {
    try {
      const res = await axiosInstance.delete(`/notes/${noteId}`);
      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        fetchNotes();
      }
    } catch (error) {
      console.log("error while deleting note", error);
      const axisError = error as AxiosError<IErrorApiResponse>;
      setError(axisError.response?.data.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

  // LOADER
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );

  // ERROR
  if (error)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ApiError message={error} />
      </div>
    );

  // NOTES
  return (
    <>
      <Navbar />

      <main className="w-full py-4 md:py-6 space-y-3">
        <Container className="flex justify-end">
          <Button
            variant={"outline"}
            size={"lg"}
            className="rounded-full uppercase"
            onClick={() => setIsModalOpen(true)}
          >
            Add Note <Plus className="size-5" />
          </Button>
        </Container>

        {/* All Notes */}
        <Container className="space-y-4">
          <h1 className="text-2xl font-semibold">All Saved Notes</h1>

          {data.notes && data.notes.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDeleteNote={onDeleteNote}
                  handleOpenChange={handleModalOpenChange}
                  handleNoteChange={handleNoteChange}
                />
              ))}
            </section>
          ) : (
            <p className="text-muted-foreground">No notes found</p>
          )}

          <div className="flex items-center justify-end gap-3 w-full">
            <Button
              variant={"outline"}
              className="rounded-full min-w-20"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <p>
              {page} / {data.totalPages}
            </p>
            <Button
              className="rounded-full min-w-20"
              variant={"outline"}
              onClick={() => setPage(page + 1)}
              disabled={page === data.totalPages}
            >
              Next
            </Button>
          </div>
        </Container>

        <NoteModal
          isOpen={isModalOpen}
          handleOpenChange={handleModalOpenChange}
          fetchNotes={fetchNotes}
          note={note}
          isEdit={note.noteId ? true : false}
          handleNoteChange={handleNoteChange}
          title={note.noteId ? "Edit Note" : "Add New Note"}
          description={
            note.noteId
              ? "Fill the form to edit a note"
              : "Fill the form to add a new note"
          }
        />
      </main>
    </>
  );
};

export default HomePage;
