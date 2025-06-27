import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    deleted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["PUBLIC", "INACTIVE"],
      default: "PUBLIC",
    },
    tourType: { type: String, required: true },
    tourTypeId: { type: String, required: true },
    tourCountry: { type: String, required: true },
    tourCountryId: { type: String, required: true },
    tourCategory: { type: String, required: true },
    tourCategoryId: { type: String, required: true },

    tourInfo: {
      title: { type: String, required: true },
      coverImage: { type: String, required: true },
      description: { type: String },
      price: { type: Number, default: 0 },
      destination: [String],
      depature: String,
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
