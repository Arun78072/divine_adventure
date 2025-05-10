import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    deleted: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["PUBLIC", "INDRAFT", "INACTIVE"],  
        default: "PUBLIC",
      },
    tour: {
      tourTitle: String,
      tourDescription: String,
      tourPrice: String,
    },
    travel: {
      travelDays: String,
      travelCountry: String,
      travelCity: String,
      travelNight: String,
    },
    meals: {
      breakfast: String,
      lunch: String,
      dinner: String,
    },
    tripMap: String,
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

export default Tour;
