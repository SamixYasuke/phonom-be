import mongoose from "mongoose";
import { buttonFunctionEnum } from "../enum/button_function.enum.js";

const sectionSchema = new mongoose.Schema(
  {
    heading_one: {
      type: String,
    },

    heading_two: {
      type: String,
    },

    paragraph_one: {
      type: String,
    },

    paragraph_two: {
      type: String,
    },

    paragraph_three: {
      type: String,
    },

    img_url: {
      type: String,
    },

    overlay_button_is_present: {
      type: Boolean,
      default: false,
    },

    overlay_button_text: {
      type: String,
    },

    overlay_button_function: {
      type: String,
      enum: Object.values(buttonFunctionEnum),
    },

    button_is_present: {
      type: Boolean,
      default: false,
    },

    button_text: {
      type: String,
    },

    button_function: {
      type: String,
      enum: Object.values(buttonFunctionEnum),
    },

    video_is_available: {
      type: Boolean,
      default: false,
    },

    video_url: {
      type: String,
      match: [/^https?:\/\/.+\.(mp4|webm|ogg)$/, "Invalid video URL"],
    },
  },
  {
    timestamps: true,
  }
);
sectionSchema.pre("save", function (next) {
  if (!this.overlay_button_is_present) {
    this.overlay_button_function = undefined;
    this.overlay_button_text = null;
  }
  if (!this.button_is_present) {
    this.button_function = undefined;
    this.button_text = null;
  }
  if (!this.video_is_available) {
    this.video_url = undefined;
  }
  next();
});

const Section = mongoose.model("Section", sectionSchema);

export default Section;
