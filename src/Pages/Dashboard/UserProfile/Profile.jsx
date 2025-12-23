import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import UseAuth from "../../../Hooks/UseAuth";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const { user, updateUserProfile } = UseAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photo: null,
    },
  });

  const watchedPhoto = watch("photo");

  // Preview image when file selected
  React.useEffect(() => {
    if (watchedPhoto && watchedPhoto[0]) {
      const file = watchedPhoto[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImg(user?.photoURL || null);
    }
  }, [watchedPhoto, user?.photoURL]);

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;

      // Upload new image if selected
      if (data.photo && data.photo[0]) {
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imgbb_host_API
        }`;

        const imgRes = await axios.post(image_API_URL, formData);

        if (!imgRes.data.success) {
          toast.error("Image upload failed, try again.");
          return;
        }

        photoURL = imgRes.data.data.url;
      }

      // Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };

      await updateUserProfile(userProfile);
      toast.success("Profile updated successfully!");

      setEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Profile update failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    if (!editing) {
      // Populate form with current values
      setValue("name", user?.displayName || "");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">My Profile</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Update your profile information
          </p>
        </div>

        {/* Profile Card */}
        <div className="card bg-base-100 shadow-lg  mx-auto">
          <div className="card-body p-8 lg:p-12">
            {/* Profile Preview */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              <div className="relative">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border overflow-hidden bg-gradient-to-r from-secondary to-primary flex items-center justify-center mx-auto lg:mx-0">
                  <img
                    src={previewImg || user?.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {editing && (
                  <label className="absolute -bottom-2 -right-2 bg-primary p-3 rounded-full shadow-lg cursor-pointer hover:bg-primary-focus transition-all">
                    <input
                      type="file"
                      {...register("photo")}
                      className="hidden"
                      accept="image/*"
                    />
                    <FaEdit className="text-white" size={20} />
                  </label>
                )}
              </div>

              {!editing ? (
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl dark:text-white lg:text-4xl font-bold text-gray-900 mb-2">
                    {user?.displayName || "User"}
                  </h2>
                  <p className="text-xl text-gray-500">
                    {user?.email || "No email"}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(handleProfileUpdate)}
                  className="flex-1"
                >
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">
                          Full Name
                        </span>
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        className="input input-bordered input-lg w-full max-w-md"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          Name is required
                        </p>
                      )}
                    </div>

                    {/* Email Display */}
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">Email</span>
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className="input input-bordered input-lg w-full max-w-md bg-base-100"
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            {editing && (
              <>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end mb-6">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="btn btn-ghost flex-1 dark:hover:bg-red-500 sm:flex-none"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit(handleProfileUpdate)}
                    disabled={loading}
                    className="btn btn-primary hover:bg-secondary flex-1 sm:flex-none"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {!editing && (
              <div className="flex justify-center">
                <button
                  onClick={handleEditToggle}
                  className="btn btn-outline btn-secondary btn-wide"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              </div>
            )}

            {/* Profile Info Card */}
            <div className="divider"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-lg mb-2 text-secondary">Email</h3>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div className="text-center md:text-right">
                <h3 className="font-bold text-lg mb-2 text-secondary">
                  Joined
                </h3>
                <p className="text-lg">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "Recently"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
