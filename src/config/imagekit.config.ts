import ImageKit from "@imagekit/nodejs";
import env from "./env.config";

export const imageKit = new ImageKit({
	privateKey: env.IMAGEKIT_PRIVATE_KEY,
});
