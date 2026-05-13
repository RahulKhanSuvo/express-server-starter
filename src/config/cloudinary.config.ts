/* eslint-disable no-useless-escape */
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import envConfig from "./env";
import AppError from "../app/errorsHelpers/AppError";
import status from "http-status";

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
  secure: true,
});
// upload file
export const uploadFileToCloudinary = async (
  buffer: Buffer,
  fileName: string,
) => {
  if (!buffer || !fileName)
    throw new AppError(status.BAD_REQUEST, "Buffer and file name are required");
  const originalName = fileName;
  const extension = originalName.split(".").pop()?.toLocaleLowerCase();

  const fileNameWithoutExtension = originalName
    .split(".")
    .slice(0, -1)
    .join(".")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  const uniqueName =
    Math.random().toString(36).substring(2) +
    "-" +
    Date.now() +
    "-" +
    fileNameWithoutExtension;

  const folder = extension === "pdf" ? "reports" : "images";
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `healthCare/${folder}`,
        public_id: uniqueName,
        resource_type: "auto",
      },
      (error, result) => {
        if (error)
          reject(new AppError(status.BAD_REQUEST, "Fail to upload file"));
        else resolve(result as UploadApiResponse);
      },
    );
    uploadStream.end(buffer);
  });
};
// delete file
export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex =
      /\/([a-z]+)\/upload\/(?:[^\/]+\/)*v\d+\/(.+?)(?:\.[a-z0-9]+)?$/i;
    const match = url.match(regex);
    if (match && match[1] && match[2]) {
      const resource_type = match[1];
      const public_id = match[2];

      await cloudinary.uploader.destroy(public_id, {
        resource_type: resource_type,
      });
      console.log(`File ${public_id} deleted from cloudinary`);
    } else {
      console.log("No match");
    }
  } catch (error) {
    console.error("Cloudinary delete error", error);
    throw new AppError(status.BAD_REQUEST, "Fail to delete file");
  }
};

export const cloudinaryUpload = cloudinary;
