interface ErrorProps {
  className?: string;
  imgSrc?: string;
  altText?: string;
  imgStyles?: string;
  errorMessage: string;
  clickAction?: () => void;
  btnAction?: string;
}

const Error = ({
  className = "",
  imgSrc,
  altText,
  imgStyles,
  errorMessage,
  clickAction,
  btnAction,
  
}: ErrorProps) => {
  return (
    <div
      className={`flex justify-center items-center flex-col w-full h-full min-h-[100vh] px-6 ${className}`}
    >
      <img
        src={imgSrc}
        alt={altText}
        className={`object-fit object-cover ${imgStyles}`}
      />

      <p className="text-md mt-4 text-center">{errorMessage}</p>

      {clickAction && (
        <button
          onClick={() => clickAction()}
          className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
        >
          {btnAction}
        </button>
      )}
    </div>
  );
};

export default Error;
