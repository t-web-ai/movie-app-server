import { imageKit } from "../config/imagekit.config";

export async function uploadSingleFile({
	file,
	path,
	fileId,
}: {
	file: Express.Multer.File;
	path: string;
	fileId?: string | undefined | null;
}) {
	if (fileId) await deleteSingleFile(fileId);

	return await imageKit.files.upload({
		file: file.buffer.toString("base64"),
		fileName: file.originalname,
		folder: path,
	});
}

export async function deleteSingleFile(fileId: string) {
	try {
		return await imageKit.files.delete(fileId);
	} catch {
		return null;
	}
}
