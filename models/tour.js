import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    deleted: { type: Boolean, default: false },
    tourImage: String,
    status: {
        type: String,
        enum: ["PUBLIC", "INDRAFT", "INACTIVE"],  
        default: "PUBLIC",
      },

    tourInfo: {
      title: String,
      description: String,
      price: Number,
      destination:String,
      depature:String,
      include: [String],
      travelDays: String,
      travelCountry: String,
      travelCity: String,
      travelNight: String,
    },
    tourPlan: [{
      title:String,
      description:String,
      list:[String]
    }],
    location:String,
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

export default Tour;
