import express from "express";
import Section from "../models/section.model.js";

const router = express.Router();

router.post("/section", async (req, res, next) => {
  try {
    const {
      heading_one,
      heading_two,
      paragraph_one,
      paragraph_two,
      paragraph_three,
      img_url,
      overlay_button_is_present,
      overlay_button_function,
      overlay_button_text,
      button_is_present,
      button_text,
      button_function,
      video_is_available,
      video_url,
    } = req.body;

    const sectionData = {
      heading_one,
      heading_two,
      paragraph_one,
      paragraph_two,
      paragraph_three,
      img_url,
      overlay_button_is_present,
      button_is_present,
      video_is_available,
    };

    if (overlay_button_is_present) {
      sectionData.overlay_button_function = overlay_button_function;
      sectionData.overlay_button_text = overlay_button_text;
    }

    if (button_is_present) {
      sectionData.button_function = button_function;
      sectionData.button_text = button_text;
    }

    if (video_is_available) {
      sectionData.video_url = video_url;
    }

    const section = new Section(sectionData);

    await section.save();
    res.status(201).json({ message: "Section saved successfully", section });
  } catch (error) {
    next(error);
  }
});

router.get("/sections", async (req, res, next) => {
  try {
    const sections = await Section.find();

    if (sections.length === 0) {
      return res.status(200).json({ message: "No sections found" });
    }

    res.status(200).json({
      status_code: 200,
      message: "Sections fetched successfully",
      data: {
        sections,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/section/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSection = await Section.findByIdAndDelete(id);
    if (!deletedSection) {
      return res.status(404).json({ message: "Section not found" });
    }
    res
      .status(200)
      .json({ message: "Section deleted successfully", deletedSection });
  } catch (error) {
    next(error);
  }
});

router.patch("/section/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      heading_one,
      heading_two,
      paragraph_one,
      paragraph_two,
      paragraph_three,
      img_url,
      overlay_button_is_present,
      overlay_button_function,
      button_is_present,
      button_function,
      video_is_available,
      video_url,
    } = req.body;

    const updateData = {};

    if (heading_one) updateData.heading_one = heading_one;
    if (heading_two) updateData.heading_two = heading_two;
    if (paragraph_one) updateData.paragraph_one = paragraph_one;
    if (paragraph_two) updateData.paragraph_two = paragraph_two;
    if (paragraph_three) updateData.paragraph_three = paragraph_three;
    if (img_url) updateData.img_url = img_url;

    if (overlay_button_is_present !== undefined) {
      updateData.overlay_button_is_present = overlay_button_is_present;
      if (overlay_button_is_present && overlay_button_function) {
        updateData.overlay_button_function = overlay_button_function;
      }
    }

    if (button_is_present !== undefined) {
      updateData.button_is_present = button_is_present;
      if (button_is_present && button_function) {
        updateData.button_function = button_function;
      }
    }

    if (video_is_available !== undefined) {
      updateData.video_is_available = video_is_available;
      if (video_is_available && video_url) {
        updateData.video_url = video_url;
      }
    }

    const updatedSection = await Section.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated fields
    });

    if (!updatedSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json({
      message: "Section updated successfully",
      section: updatedSection,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
