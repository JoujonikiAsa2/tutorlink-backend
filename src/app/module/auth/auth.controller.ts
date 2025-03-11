import { asyncHandler } from "../../utils/asyncHandler";
import { responseHandler } from "../../utils/responseHandler";
import { authServices } from "./auth.service";

//tutor
const registerAsTutor = asyncHandler(async(req, res)=>{
    const result = await authServices.registerAsTutor(req.body)
    responseHandler(res, {
        success: true,
        statusCode: 200,
        message: 'User registered successfully',
        data: result,
    })
}) 

//student
const registerAsStudent = asyncHandler(async(req, res)=>{
    const result = await authServices.registerAsStudent(req.body)
    responseHandler(res, {
        success: true,
        statusCode: 200,
        message: 'User registered successfully',
        data: result,
    })
})

export const authControllers = {
    registerAsTutor,
    registerAsStudent
}