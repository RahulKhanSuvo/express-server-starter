import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import envConfig from "./env";
import multer from "multer";

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname;
    const fileExtension = originalName.split(".").pop()?.toLowerCase();
    const fileWithoutExtension = originalName
      .split(".")
      .slice(0, -1)
      .join(".")
      .toLowerCase()
      .replace(/\s/g, "_")
      .replace(/[^A-Za-z0-9_\-.]/g, "");

    const uniqueName = `${Math.random().toString(36).substring(2)}+"-"+${Date.now()}+"-"+${fileWithoutExtension}`;
    const folder = fileExtension === "pdf" ? "Reports" : "Images";

    return {
      folder: `healthCare/${folder}`,
      public_id: uniqueName,
      resource_type: "auto",
    };
  },
});

export const multerUpload = multer({ storage });
