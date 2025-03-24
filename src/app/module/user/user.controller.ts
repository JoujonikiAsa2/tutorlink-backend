import { asyncHandler } from "../../utils/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { userServices } from "./user.service";
import httpStatus from 'http-status'

const getAllUser = asyncHandler(async(req, res) =>{
    const result = await userServices.getAllUsersFromDB()
    responseHandler(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Retrived all users successfully',
        data: result,
    })
})
const getUserByEmail = asyncHandler(async(req, res) =>{
    const email = req.params.email
    const result = await userServices.getUserByEmail(email)
    responseHandler(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Retrived all users successfully',
        data: result,
    })
})

export const userControllers = {
    getAllUser,
    getUserByEmail
}