import React from "react";
import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
};

export default Spinner;
