import { Response } from "express"

type TMeta = {
    totalPage: number,
    totalDoc: number,
 page: number,
 limit: number
}

type TResponseInfo<T> = {
    success: boolean,
    statusCode: number
    message: string
    data?: T,
    meta?:TMeta
}

export const responseHandler = <T>(res: Response, responseInfo: TResponseInfo<T>) =>{
    const { success, statusCode, message, data, meta } = responseInfo
    res.status(statusCode).json({
        success,
        message,
        data,
        meta
    })
}