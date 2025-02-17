import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ userId: req.user, isActive: true });
    res.json(coupon || null);
  } catch (error) {
    console.log("Error is in getCoupon", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Купон не найден" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ mesage: "Срок действия купона истек" });
    }

    res.json({
      message: "Купон действителен",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("Error is in validateCoupon", error.message);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
