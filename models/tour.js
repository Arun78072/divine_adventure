import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    id: String,
    deleted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["PUBLIC", "INACTIVE"],
      default: "PUBLIC",
    },
    tourType:{
      type: String,
    },
    tourTypeId:{
      type: String,
    },
    tourInfo: {
      title: String,
      coverImage: String,
      description: String,
      price: Number,
      destination: [String],
      depature: String,
      depatureTime: String,
      returnTime: String,
      include: [String],
      notInclude: [String],
      travelDays: String,
      travelCountry: String,
      travelCity: String,
      travelNight: String,
      country: String,
    },
    tourPlan: [
      {
        title: String,
        description: String,
        locationImage: String,
        list: [String],
      },
    ],
    location: {
      note: String,
      address: String,
      locationLink: String,
    },
    gallery: {
      image: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

export default Tour;
