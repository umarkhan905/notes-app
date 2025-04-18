import React from "react";
import Container from "@/components/Container";
import { Lightbulb } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full bg-background/20 backdrop-blur-lg sticky top-0 z-50 shadow">
      <Container className=" min-h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1 text-primary">
          <Lightbulb className="size-6" />
          <h1 className="text-2xl">Keep</h1>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
