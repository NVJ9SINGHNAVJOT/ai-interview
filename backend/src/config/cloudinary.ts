import { logger } from "@/logger/logger";
import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConnect = (): void => {
  try {
    logger.info("connecting cloudinary");
    cloudinary.config({
      cloud_name: `${process.env["CLOUD_NAME"]}`,
      api_key: `${process.env["API_KEY"]}`,
      api_secret: `${process.env["API_SECRET"]}`,
      secure: true,
    });
    logger.info("cloudinary connected");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("error while connection cloudinary", { error: error.message });
    process.exit();
  }
};
