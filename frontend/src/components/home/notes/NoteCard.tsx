import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { INote, Note } from "@/types";
import { formatDate } from "@/utils/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface Props {
  note: INote;
  onDeleteNote: (noteId: string) => void;
  handleOpenChange: (isOpen: boolean) => void;
  handleNoteChange: (note: Note) => void;
}

const NoteCard = ({
  note,
  onDeleteNote,
  handleNoteChange,
  handleOpenChange,
}: Props) => {
  return (
    <Card key={note._id}>
      <CardContent className="space-y-2">
        <h2 className="text-lg font-semibold">{note.title}</h2>
        <p className="text-muted-foreground">{note.content}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm">-- {formatDate(note.createdAt)}</p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  handleOpenChange(true);
                  handleNoteChange({
                    title: note.title,
                    content: note.content,
                    noteId: note._id,
                  });
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteNote(note._id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
