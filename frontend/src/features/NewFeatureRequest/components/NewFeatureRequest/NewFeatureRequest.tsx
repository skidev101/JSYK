import { FadeDown } from "@/shared/components/Motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSendFeatureRequest } from "../../hooks/useSendFeatureRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewFeatureRequest = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { sendFeatureRequest, loading } = useSendFeatureRequest();

  const sendRequest = async () => {
    if (!messageToSend) {
      setError("Content is required");
      return;
    }    
    
    try {
      const success = await sendFeatureRequest(messageToSend);

      if (success) {
        toast.success("Request sent");
        setMessageToSend("");
        navigate("/dashboard");
      } else {
        toast.error("An error occured");
      }
    } catch (err) {
      console.error("failed to send feature request:", err);
    }
  };

  return (
  <FadeDown>
    <div className="workspace-page">
      <div className="workspace-heading"><div><p className="workspace-kicker">Help shape JSYK</p><h1>Tell us what is missing.</h1></div><p>The best product ideas usually start with a small annoyance.</p></div>
        <div className="form-panel" style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Header */}
          <div className="workspace-panel-title"><h2>Feature request</h2></div>

          {/* Card */}
          <div>
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
                placeholder="Describe the feature you'd like to see..."
                className="auth-input"
              />

              {error && (
                <p className="auth-error">{error}</p>
              )}

              <button
                disabled={loading}
                onClick={sendRequest}
                className={`app-primary-button
                            ${
                              loading ? "cursor-not-allowed" : ""
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
  </FadeDown>
);

};

export default NewFeatureRequest;
