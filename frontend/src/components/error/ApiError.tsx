import React from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  message?: string;
  className?: string;
};

const ApiError = ({ message, className }: Props) => {
  if (!message) return null;
  return (
    <div
      className={`max-w-md w-full text-center bg-destructive/20 rounded-md p-4 text-destructive ${className}`}
    >
      <div className="space-y-2">
        <TriangleAlert className="size-10 mx-auto" />
        <span className="text-lg font-semibold">{message}</span>
        <p className="text-sm">Please try again later</p>

        <Button
          variant={"destructive"}
          onClick={() => {
            window.location.reload();
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ApiError;
