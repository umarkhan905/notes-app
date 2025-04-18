import React from "react";
import { TriangleAlert } from "lucide-react";

interface Props {
  message?: string;
}

const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="w-full bg-destructive/20 text-destructive rounded-md p-3">
      <div className="flex items-center gap-2">
        <TriangleAlert className="size-5" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default FormError;
