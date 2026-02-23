import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toast.success(updateUserData.message || "Profile updated");
      refetch();
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update");
    }
  }, [updateUserData, isError, refetch, error, isSuccess]);

  if (isLoading) return <ProfileSkeleton />;
  const user = data?.user;

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  const Field = ({ label, value }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-black/35 dark:text-white/30">
        {label}
      </span>
      <span className="text-sm font-medium text-black dark:text-white">
        {value}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-bold text-2xl text-black dark:text-white mb-8">
          Profile
        </h1>

        {/* Profile card */}
        <div className="glass-card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-black/10 dark:ring-white/10">
                <AvatarImage
                  src={user?.photoUrl || "https://github.com/shadcn.png"}
                  alt={user?.name}
                />
                <AvatarFallback className="bg-black/10 dark:bg-white/10 text-black dark:text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Name" value={user?.name} />
                <Field label="Email" value={user?.email} />
                <Field label="Role" value={user?.role?.toUpperCase()} />
              </div>

              <div className="h-px bg-black/[0.07] dark:bg-white/[0.07]" />

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-glow rounded-xl w-fit text-sm flex items-center gap-2">
                    <Camera size={14} /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#101010] border border-black/10 dark:border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-black dark:text-white">
                      Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-black/40 dark:text-white/35">
                      Update your name or profile picture below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label className="text-black/50 dark:text-white/40 text-xs uppercase tracking-wider">
                        Name
                      </Label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl h-10"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label className="text-black/50 dark:text-white/40 text-xs uppercase tracking-wider">
                        Profile Photo
                      </Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files?.[0])}
                        className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white rounded-xl h-10 file:mr-3 file:text-xs file:font-semibold"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      disabled={updateUserIsLoading}
                      onClick={updateUserHandler}
                      className="btn-glow rounded-xl text-sm"
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="mr-1 animate-spin h-4 w-4" />
                          Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Enrolled courses */}
        <div>
          <h2 className="font-bold text-lg text-black dark:text-white mb-4">
            Enrolled Courses
          </h2>
          {user?.enrolledCourses?.length === 0 ? (
            <div className="glass-card p-10 text-center text-black/35 dark:text-white/30">
              You haven't enrolled in any courses yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user?.enrolledCourses?.map((course) => (
                <Course course={course} key={course._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-[var(--background)] pt-20 pb-10">
    <div className="max-w-4xl mx-auto px-4">
      <Skeleton className="h-8 w-24 mb-8 bg-black/5 dark:bg-white/5" />
      <div className="glass-card p-8 mb-8">
        <div className="flex gap-8">
          <Skeleton className="h-32 w-32 rounded-full bg-black/5 dark:bg-white/5" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-5 w-40 bg-black/5 dark:bg-white/5" />
            <Skeleton className="h-5 w-56 bg-black/5 dark:bg-white/5" />
            <Skeleton className="h-5 w-28 bg-black/5 dark:bg-white/5" />
            <Skeleton className="h-10 w-32 bg-black/5 dark:bg-white/5 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
