import { ALLOWED_IMAGE_TYPES, LIMIT_IMAGE_SIZE } from "../common/constants";
import { createUploader } from "../utils/multer.util";

export const uploadImage = createUploader({
	allowedFileTypes: ALLOWED_IMAGE_TYPES,
	maxFileSize: LIMIT_IMAGE_SIZE,
});
