import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/error/FormError";
import { AxiosError } from "axios";
import { IErrorApiResponse, INote, ISuccessApiResponse, Note } from "@/types";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  handleOpenChange: (isOpen: boolean) => void;
  handleNoteChange: (note: Note) => void;
  fetchNotes: () => void;
  note?: Note;
  title?: string;
  description?: string;
  isEdit?: boolean;
}

type IFormData = {
  title: string;
  content: string;
};

const NoteModal = ({
  isOpen,
  handleOpenChange,
  fetchNotes,
  note,
  title = "Add New Note",
  description = "Fill the form to add a new note",
  isEdit,
  handleNoteChange,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<string>("");
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    content: "",
  });

  useEffect(() => {
    setFormData({
      title: note?.title || "",
      content: note?.content || "",
    });
    setNoteId(note?.noteId || "");
  }, [note]);

  const handleFormDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNote = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    try {
      e.preventDefault();
      const res = await axiosInstance.post<
        ISuccessApiResponse<{ note: INote }>
      >("/notes", formData);
      const data = res.data;
      if (data.success) {
        fetchNotes();
        toast(data.message);
        handleOpenChange(false);
      }
    } catch (error) {
      console.log("Error in handleAddNote: ", error);
      const axiosError = error as AxiosError<IErrorApiResponse>;
      setError(axiosError.response?.data.message || "Internal server errro");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    try {
      e.preventDefault();
      const res = await axiosInstance.patch<
        ISuccessApiResponse<{ note: INote }>
      >(`/notes/${noteId}`, formData);
      const data = res.data;
      if (data.success) {
        fetchNotes();
        toast(data.message);
        handleOpenChange(false);
        handleNoteChange({ title: "", content: "", noteId: "" });
      }
    } catch (error) {
      console.log("Error in handleUpdateNote: ", error);
      const axiosError = error as AxiosError<IErrorApiResponse>;
      setError(axiosError.response?.data.message || "Internal server errro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        handleOpenChange(false);
        setFormData({ title: "", content: "" });
        setError(null);
        handleNoteChange({ title: "", content: "", noteId: "" });
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={isEdit ? handleUpdateNote : handleAddNote}
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              placeholder="Note title here..."
              className="min-h-10 placeholder:text-sm"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleFormDataChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="Note content here..."
              className="min-h-20 resize-none placeholder:text-sm"
              name="content"
              id="content"
              value={formData.content}
              onChange={handleFormDataChange}
            />
          </div>

          {error && <FormError message={error} />}

          <Button type="submit" className="w-full min-h-10">
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isEdit ? (
              "Update Note"
            ) : (
              "Add Note"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
