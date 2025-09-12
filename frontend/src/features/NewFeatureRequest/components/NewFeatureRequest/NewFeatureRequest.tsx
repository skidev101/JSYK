import { FadeDown } from "@/shared/components/Motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSendFeatureRequest } from "../../hooks/useSendFeatureRequest";
import toast from "react-hot-toast";

const NewFeatureRequest = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const { sendFeatureRequest, loading, error } = useSendFeatureRequest();

  const sendRequest = async () => {    
    
    try {
      const success = await sendFeatureRequest(messageToSend);

      if (success) {
        toast.success("Request sent");
        setMessageToSend("");
      } else {
        toast.error("An error occured");
      }
    } catch (err) {
      console.error("failed to send feature request:", err);
    }
  };

  return (
  <FadeDown>
    <div className="w-full min-h-screen mt-16 px-2 bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100">
      <div className="flex justify-center items-start">
        <div className="w-full max-w-2xl mt-12">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Want a new feature?
            </h1>
            <p className="text-gray-600 mt-2">
              Share your ideas — we’d love to hear from you 💡
            </p>
          </div>

          {/* Card */}
          <div className="w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Your request
              </label>

              <textarea
                id="message"
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                placeholder="Describe the feature you’d like to see..."
                className="w-full min-h-[120px] p-3 text-sm rounded-lg border border-gray-300 bg-gray-50 
                           focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 
                           outline-none transition-all resize-none"
              />

              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}

              <button
                disabled={loading}
                onClick={sendRequest}
                className={`flex justify-center items-center gap-2 w-full text-white font-semibold 
                            px-4 py-3 mt-5 rounded-lg shadow-md transition-all duration-200 hover:cursor-pointer
                            ${
                              loading
                                ? "bg-gradient-to-r from-blue-300 to-purple-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02] active:scale-[0.98]"
                            }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeDown>
);

};

export default NewFeatureRequest;
