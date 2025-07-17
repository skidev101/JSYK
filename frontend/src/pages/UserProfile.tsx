import { FadeIn } from "../components/MotionWrappers";

const UserProfile = () => {
  return (
    <FadeIn>
      <div className="w-full flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 bg-white shadow-xl border border-gray-100">
          <img
            src="/form.webp"
            alt="user"
            className="w-26 h-26 rounded-full object-cover p-1.5 border border-gray-200"
          />
          <h1 className="text-xl font-semibold mt-2">@ski101</h1>
          <p className="text-sm text-gray-700 bg-gray-100 max-w-max px-3 py-1 sm:px-4  rounded-full">
            jsyk.com/ski101
          </p>
          <p className="text-sm text-gray-700 bg-gray-100 text-center max-w-max px-3 py-2 mt-1 sm:px-3 sm:py-2 rounded-lg">
            monaski is a developer that loves to create meaningful stuffs and
            change the world
          </p>
          <div className="flex items-center gap-2 w-full mt-5">
            <button className="flex flex-1/2 justify-center items-center gap-2 bg-gray-100 text-gray-800 rounded-full px-3 py-2 text:sm sm:text-base cursor-pointer transition-all active:scale-95">
               Copy profile
            </button>
            <button className="flex flex-1/2 justify-center items-center bg-blue-500 text-white rounded-full px-3 py-2 text:sm sm:text-base cursor-pointer transition-all active:scale-95">
               Message 
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default UserProfile;
