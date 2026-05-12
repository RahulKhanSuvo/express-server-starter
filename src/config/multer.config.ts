import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    const originalName = file.originalname;
    const fileExtension = originalName.split(".").pop()?.toLocaleLowerCase();
    const fileWithoutExtension = originalName
      .split(".")
      .slice(0, -1)
      .join(".")
      .toLocaleLowerCase()
      .replace(/\s/g, "_")
      .replace(/[^A-Za-z0-9_\-.]/g, "");
    const uniqueName =
      Math.random().toString(36).substring(2, 10) + "-" + Date.now();
    const folder = fileExtension === "pdf" ? "Reports" : "Images";
    return {
      folder: `healthCare/${folder}`,
      public_id: `${fileWithoutExtension}-${uniqueName}.${fileExtension}`,
      resource_type: "auto",
    };
  },
});
export const multerUpload = multer({ storage });
