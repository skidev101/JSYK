import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  AlertTriangle,
  Pencil,
  X,
  Loader2,
  Upload,
  Link2,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeRight } from "./MotionWrappers";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { uploadToImageKit } from "../utils/uploadToImageKit";
import axios from "axios";

interface ProfileDrawerProps {
  show: boolean;
  onClose: () => void;
  onLogoutClick?: () => void;
  onDeleteClick?: () => void;
}

const ProfileDrawer = ({
  show,
  onClose,
  onLogoutClick,
  onDeleteClick,
}: ProfileDrawerProps) => {
  const { user } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const profileImgRef = useRef<HTMLInputElement | null>(null);

  //sync state with user data onchange
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
      });
      setPreviewImg(user?.profileImgUrl || null);
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setPreviewImg(URL.createObjectURL(file));
  };

  const handleProfileEdit = async () => {
    setLoading(true);

    try {
      let imgUrl;
      let fileId;
      if (imgFile) {
        const result = await uploadToImageKit({
          file: imgFile,
          folder: "jsyk/profileImgs",
        });
        imgUrl = result.url;
        fileId = result.fileId;
      }

      const response = await axios.patch(
        "http://127.0.0.1:3000/api/topic",
        {
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          profileImgUrl: imgUrl,
          fileId: fileId
        },
        {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("profile updated successfully:", response.data);
    } catch (err: any) {
      console.log("Error updating profile:", err);
    }

    // const formPayload = new FormData();
    // formPayload.append("username", formData.username);
    // formPayload.append("email", formData.email);
    // formPayload.append("bio", formData.bio);
    // if (imgFile) formPayload.append("profileImgUrl", imgFile);

    setTimeout(() => {
      console.log("updated profile");
      setEditMode(false);
      setLoading(false);
      toast.success("Profile updated successfully!");
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <FadeRight className="fixed top-0 right-0 w-72 h-full bg-white z-60 p-4 shadow-lg flex flex-col">
            <div className="flex-grow overflow-y-auto overflow-x-hidden">
              <div className="flex justify-between items-center mb-4 py-2 border-b-2 border-gray-300">
                <h2 className="text-lg font-semibold">Profile</h2>
                <button
                  onClick={onClose}
                  className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-md hover:bg-gray-200 cursor-pointer active:scale-[0.97] transition duration-200"
                >
                  <X className="cursor-pointer" />
                </button>
              </div>

              {!editMode && (
                <div className="flex justify-end px-2">
                  <button
                    onClick={() => {
                      setEditMode(true);
                    }}
                    className="flex items-center rounded-full px-3 py-1 text-white bg-blue-500 transition duration-200 cursor-pointer active:scale-[0.95]"
                  >
                    <p className="px-1 text-sm">Edit</p>
                    <Pencil size={15} />
                  </button>
                </div>
              )}

              <div className="flex flex-col items-center gap-2">
                <div className="relative group">
                  {previewImg ? (
                    <img
                      src={previewImg}
                      alt="avatar"
                      className="w-24 h-24 rounded-full object-cover mb-2 p-1.5 border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 text-2xl sm:text-3xl rounded-full flex items-center justify-center text-white font-bold bg-blue-500 mb-2 p-2 sm:p-8">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {editMode && (
                    <button
                      onClick={() => profileImgRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full hover:bg-gray-300 outline-4 outline-white cursor-pointer active:scale-[0.98] transition duration-150"
                    >
                      <Upload size={17} />
                    </button>
                  )}

                  <input
                    type="file"
                    ref={profileImgRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center min-h-max mt-5 p-2">
                {editMode ? (
                  <>
                    <label
                      htmlFor="username"
                      className="w-full mt-2 text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="hidden w-full text-red-500 text-[13px]">
                      Username already taken!
                    </p>
                  </>
                ) : (
                  <h1 className="text-xl font-semibold mt-2">
                    {user?.username}
                  </h1>
                )}

                {editMode ? (
                  <>
                    <label
                      htmlFor="email"
                      className="w-full mt-2 text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </>
                ) : (
                  <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 sm:px-4 sm:py-1 rounded-full">
                    {user?.email}
                  </p>
                )}

                {editMode ? (
                  <>
                    <label htmlFor="bio" className="w-full mt-2 text-gray-500">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Bio"
                      className="resize-none text-sm w-full min-h-20 p-2 bg-gray-100 scrollbar-none focus:ring-2 focus:ring-blue-500 border-none outline-none rounded-md"
                    />
                  </>
                ) : (
                  <p className="text-sm text-gray-700 bg-gray-100 max-w-max px-3 py-2 mt-2 sm:mt-4 sm:px-3 sm:py-2 rounded-lg">
                    {user?.bio || "No Bio yet"}
                  </p>
                )}

                {!editMode && (
                  <div className="flex justify-center items-center flex-col mt-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Link2 size={15} />
                      <p>Profile Link</p>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-100 max-w-max mt-1 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                      {`jsyk.com/${user?.jsykLink}`}
                    </p>
                  </div>
                )}
              </div>

              {editMode && (
                <>
                  <button
                    disabled={loading}
                    onClick={handleProfileEdit}
                    className={`${
                      loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500"
                    } flex justify-center items-center w-full p-2 mt-8 rounded-full font-semibold text-white hover:scale-[1.01] hover:bg-blue-400 active:scale-[0.98] transition duration-200 cursor-pointer`}
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => setEditMode(false)}
                    className="flex justify-center items-center w-full p-2 mt-2 rounded-full bg-gray-300 font-semibold text-gray-700 hover:text-white hover:scale-[1.01] hover:bg-gray-400 active:scale-[0.98] transition duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {!editMode && (
              <div>
                <div className="py-1 flex items-center border-t-1 border-gray-300">
                  <button
                    onClick={onLogoutClick}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 active:scale-[0.98] transition duration-150"
                  >
                    <LogOut size={18} />
                    <p className="text-sm sm:text-base px-2">Logout</p>
                  </button>
                </div>
                <div className="py-1 text-red-500 flex items-center border-t-1 border-gray-300">
                  <button
                    onClick={onDeleteClick}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 active:scale-[0.98] transition duration-150"
                  >
                    <AlertTriangle size={18} />
                    <p className="text-sm sm:text-base px-2">Delete account</p>
                  </button>
                </div>
              </div>
            )}
          </FadeRight>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDrawer;
