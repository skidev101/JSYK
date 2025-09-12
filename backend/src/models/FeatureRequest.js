import mongoose from "mongoose";

const featureRequestSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FeatureRequest = mongoose.model("featureRequest", featureRequestSchema);
export default FeatureRequest;
