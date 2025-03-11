import { asyncHandler } from "../../utils/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { userServices } from "./user.service";

const getAllUser = asyncHandler(async(req, res) =>{
    const result = await userServices.getAllUsersFromDB()
    responseHandler(res, {
        success: true,
        statusCode: 200,
        message: 'Retrived all users successfully',
        data: result,
    })
})

export const userControllers = {
    getAllUser
}