import dbConnect from "@/lib/db";
import HomeSliderModel from "@/models/homesliderSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import fs from 'fs';
import path from "path";

const saveImageFile = async (file, uploadDirectory) => {
    try {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDirectory, fileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        return fileName;
    } catch (error) {
        handleError(error, "Error saving the image File")
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        let data = {
            desktop: [], mobile: []
        };

        for (let [key, value] of formData.entries()) {
            if (key.startsWith('desktop')) {
                data.desktop.push(value);
            }
            if (key.startsWith('mobile')) {
                data.mobile.push(value);
            }
        }
        if (data.desktop.length === 0 && data.mobile.length === 0) { return handleError(null, "no image found, upload again please") };


        const uploadDirectory = path.join(process.cwd(), 'public', 'images/homeslider');

        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        if (data.desktop && data.desktop.length > 0) {
            const desktopImages = [];
            for (let file of data.desktop) {
                const fileName = await saveImageFile(file, uploadDirectory);
                desktopImages.push(fileName)
            }
            data.desktop = desktopImages
        }
        if (data.mobile && data.mobile.length > 0) {
            const mobileImages = [];
            for (let file of data.mobile) {
                const fileName = await saveImageFile(file, uploadDirectory);
                mobileImages.push(fileName)
            }
            data.mobile = mobileImages
        }

        await dbConnect();
        let images = [];
        if (data.desktop && data.desktop.length > 0 && !data.desktop.includes(undefined)) {
            for (let url of data.desktop) {
                images.push({
                    device: 'desktop',
                    imageurl: url
                })
            }
        }
        if (data.mobile && data.mobile.length > 0 && !data.mobile.includes(undefined)) {
            for (let url of data.mobile) {
                images.push({
                    device: 'mobile',
                    imageurl: url
                })
            }
        }
        await HomeSliderModel.insertMany(images);
        return handleSuccess(null, null, "file upload successfully")

    } catch (error) { return handleError(error) }
}



