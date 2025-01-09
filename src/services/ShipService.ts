import { shipModel } from "../models";
import { uploadImage } from "../utils/cloudinary";

export class ShipsService {
    public async getShips(): Promise<unknown> {
        try {
            const response = await shipModel.find({});
            return response;
        } catch (error: unknown) {
            throw new Error("An unknown error occurred");
        }
    }

    public async getShip(id: string): Promise<unknown> {
        try {
            const response = await shipModel.findById(id);
            return response;
        } catch (error: unknown) {
            throw new Error("An unknown error occurred");
        }
    }

    public async createShip(body: any, file: any): Promise<unknown> {
        try {
            console.log("inicio")
            /* const result = await uploadImage(file.path); */ 
            const response = await shipModel.create({
                ...body,
               /*  image: { imageUrl: result.url, public_Id: result.public_id }, */
            });
            return response;
        } catch (error: unknown) {
            throw new Error("An error occurred while creating the ship");
        }
    }

    public async deleteShip(id: string): Promise<unknown> {
        try {
            const response = await shipModel.findByIdAndDelete(id);
            return response;
        } catch (error: unknown) {
            throw new Error("An unknown error occurred");
        }
    }
}