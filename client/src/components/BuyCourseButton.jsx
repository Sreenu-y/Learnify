import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({ courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Invalid response from server");
      }
    }
    if (isError) {
      toast.error(error.data?.message || "Failed to create session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      onClick={purchaseCourseHandler}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
