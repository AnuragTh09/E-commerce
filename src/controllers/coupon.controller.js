import  {Coupon}  from '../models/coupon.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customErrors.js';

export const createCoupon = asyncHandler(async(req, res) => {
    const { code, discount } = req.body;
    if(! code || ! discount){
        throw new CustomError("code and discount is required",400)
    }

    // check if code is already exists

    const coupon = await Coupon.create({
        code, discount
    })

    res.status(200).json({
        success: true,
        message: "Coupon created successfully",
        coupon
    })

})


export const getAllCoupons = asyncHandler(async(req, res) => {
    const allCoupons = await Coupon.findAll();

    if(! allCoupons){
        throw new CustomError("No coupon found",400)
    }

    res.status(200).json({
        success: true,
        allCoupons
    })
} )

export const updateCoupon = asyncHandler( async(req, res) => {
    const { id: couponId } = req.params
    const {action} = req.body

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId,{
        active: action
    }, {
        new: true,
        runValidators: true
    });
    
    if(!updatedCoupon){
        throw new CustomError("No coupon found",404)
    }
    res.status(200).json({
        success: true,
        message: "Coupon updated successfully",
        updatedCoupon
    })
})

export const deleteCoupon = asyncHandler(async(req, res) => {
    const { id: couponId } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if(!deletedCoupon){
        throw new CustomError("No coupon found",404);
    }

    req.status(200).json({
        success: true,
        message: "Coupon deleted successfully."
    })
})