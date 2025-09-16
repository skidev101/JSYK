import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  AlertTriangle,
  Pencil,
  X,
  Loader2,
  Upload,
  LogOut,
  User,
  CheckCircle2Icon,
  XCircleIcon,
  MessageCircleHeart,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeRight } from "@/shared/components/Motion";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import {
  uploadToCloudinary,
  type UploadResult,
} from "@/shared/services/imageKit/uploadToCloudinary";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useUsernameCheck } from "@/shared/hooks/useUsernameCheck";
import { validateUsername } from "@/shared/utils/validateInputField";
import ActionModal from "@/shared/components/UI/Modals/Action/ActionModal";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";

interface ProfileDrawerProps {
  show: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ show, onClose }: ProfileDrawerProps) => {
  const { user, logout, refetchUser } = useAuth();
  const { deleteAccount } = useDeleteAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const profileImgRef = useRef<HTMLInputElement | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const { status } = useUsernameCheck(formData.username, user?.username);
  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState("");
  const [header, setHeader] = useState("");
  const [warning, setWarning] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const isInAdmin = location.pathname.startsWith("/admin");

  // sync state with user data onchange
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        bio: user.bio || "",
      });
      setPreviewImg(user?.profileImgUrl || null);
    }
  }, [user]);

  if (!user) return;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name == "username") {
      const usernameErr = validateUsername(value);
      setUsernameError(usernameErr);
    }
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
    setUsernameError(null);

    try {
      let imgUrl;
      let publicId;
      if (imgFile) {
        const result: UploadResult = await uploadToCloudinary({
          file: imgFile,
          folder: "/jsyk/profileImgs",
        });
        imgUrl = result.url;
        publicId = result.publicId;
      }

      console.log("profileimgUrl:", imgUrl);

      const response = await axiosPrivate.patch("/profile", {
        username: formData.username.toLowerCase(),
        bio: formData.bio,
        profileImgUrl: imgUrl,
        publicId: publicId,
      });

      await refetchUser();
      console.log("profile updated successfully:", response.data);
    } catch (err: any) {
      console.log("Error updating profile:", err);
      toast.error("An error occured");
    } finally {
      setLoading(false);
      setEditMode(false);
      onClose();
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    setShowActionModal(true);
    setAction("Logout");
    setHeader("Logout");
    setWarning("Are you sure you want to logout?");
  };

  const handleDelete = () => {
    setShowActionModal(true);
    setAction("Delete");
    setHeader("Delete account😪");
    setWarning("Are you sure? All messages will be lost");
  };

  const handleConfirmAction = async () => {
    setLoadingAction(true);

    try {
      if (action === "Logout") {
        await logout();
        navigate("/login");
      } else if (action === "Delete") {
        const success = await deleteAccount();
        if (success) {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Action error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoadingAction(false);
      setShowActionModal(false);
    }
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

          <FadeRight className="fixed top-0 right-0 max-w-sm w-full h-full bg-white z-60 p-4 shadow-lg flex flex-col">
            <div className="flex-grow overflow-y-auto overflow-x-hidden">
              <div className="flex justify-between items-center mb-4 py-2 border-b-2 border-gray-300">
                <h2 className="text-lg text-gray-700 font-semibold">Profile</h2>
                <button
                  onClick={onClose}
                  className={`${
                    editMode && "hidden"
                  } grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-gray-200 cursor-pointer active:scale-95 transition duration-200 outline-0`}
                >
                  <X className="cursor-pointer text-gray-700" />
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
                  <div className="w-full ">
                    <label
                      htmlFor="username"
                      className="flex gap-2 w-full mt-2 text-gray-600"
                    >
                      <User size={20} className=" text-gray-400" />
                      Username
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {status === "checking" ? (
                        <Loader2
                          size={18}
                          className={`animate-spin absolute ${
                            usernameError && "hidden"
                          } top-3 right-3 text-gray-500`}
                        />
                      ) : status === "available" ? (
                        <CheckCircle2Icon
                          size={18}
                          className={`absolute ${
                            usernameError && "hidden"
                          } top-3 right-3 text-green-500`}
                        />
                      ) : status === "taken" ? (
                        <XCircleIcon
                          size={18}
                          className="absolute top-3 right-3 text-red-500"
                        />
                      ) : status === "forbidden" ? (
                        <XCircleIcon
                          size={18}
                          className={`absolute ${
                            usernameError && "hidden"
                          } top-3 right-3 text-red-500`}
                        />
                      ) : null}
                    </div>

                    {usernameError && (
                      <p className="text-red-500 mt-1 text-sm">
                        {usernameError}
                      </p>
                    )}
                  </div>
                ) : (
                  <h1 className="text-xl font-semibold mt-2">
                    @{user?.username}
                  </h1>
                )}

                {!editMode && (
                  <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 sm:px-4 sm:py-1 rounded-full">
                    {user?.email}
                  </p>
                )}

                {editMode ? (
                  <>
                    <label
                      htmlFor="bio"
                      className="flex gap-2 w-full mt-4 text-gray-600"
                    >
                      <Pencil size={20} className="text-gray-400" />
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

                {/* {!editMode && (
                  <div className="flex justify-center items-center flex-col mt-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Link2 size={15} />
                      <p>Profile Link</p>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-100 max-w-max mt-1 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                      {`${user?.jsykLink}`}
                    </p>
                  </div>
                )} */}
              </div>

              {editMode && (
                <>
                  <button
                    disabled={loading || status === "forbidden" || status === "taken" || status === "idle" || status === "checking"}
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
                    className="flex justify-center items-center w-full p-2 mt-2 rounded-full bg-gray-200 font-semibold text-gray-700 hover:scale-[1.01] hover:bg-gray-300 active:scale-[0.98] transition duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {!editMode && user?.role !== "Admin" && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate("/feature-request");
                  }}
                  className="flex items-center gap-2 p-2 rounded-full bg-gray-100 border border-purple-300 hover:cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageCircleHeart size={20} className="text-purple-400" />
                  {/* <p>Request feature</p> */}
                </button>
              </div>
            )}

            {!editMode && user?.role == "Admin" && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate(isInAdmin ? "/dashboard" : "/admin/dashboard");
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 hover:cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  {isInAdmin ? (
                    <User size={20} className="text-gray-400" />
                  ) : (
                    <Shield size={20} className="text-gray-400" />
                  )}
                  <p className="text-gray-700">
                    {isInAdmin ? "To User panel" : "To Admin panel"}
                  </p>
                </button>
              </div>
            )}

            {!editMode && (
              <div>
                <div className="py-1 flex items-center border-t-1 border-gray-300">
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 active:scale-[0.98] transition duration-150"
                  >
                    <LogOut size={18} />
                    <p className="text-sm sm:text-base px-2">Logout</p>
                  </button>
                </div>
                <div className="py-1 text-red-500 flex items-center border-t-1 border-gray-300">
                  <button
                    onClick={handleDelete}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 active:scale-[0.98] transition duration-150"
                  >
                    <AlertTriangle size={18} />
                    <p className="text-sm sm:text-base px-2">Delete account</p>
                  </button>
                </div>
              </div>
            )}

            {/* Action modal */}
            <ActionModal
              isOpen={showActionModal}
              onClose={() => setShowActionModal(false)}
              warning={warning}
              header={header}
              btnAction={action}
              loading={loadingAction}
              handleAction={handleConfirmAction}
            />
          </FadeRight>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDrawer;
