const joi = require("joi");

// Patterns
const passowrdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&^#()[\\]{}|\\\\<>+=._-])[A-Za-z\\d@$!%*?&^#()[\\]{}|\\\\<>+=._-]+$";

// User signup validator
const userSignupValidator = joi.object({
    email: joi.string().trim().email().max(50).lowercase().required().label("Email"),
    password: joi.string().min(8).max(128).pattern(new RegExp(passowrdPattern)).required().messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        "string.min": "Password must be at least 8 characters long."
    }).label("Password"),
    confirmPassword: joi.string().valid(joi.ref("Password")).required().label("Confirm Password")
});

// User login validator
const userLoginValidator = joi.object({
    email: joi.string().trim().email().lowercase().required().label("Email"),
    password: joi.string().trim().required().label("Password")
});

// Verify otp validator
const verifyOtpValidator = joi.object({
    userId: joi.string().trim().length(24).required().label("User ID"),
    accountVerificationToken: joi.string().trim().length(6).required().label("OTP")
});

// Resend OTP validator
const resendOtpValidator = joi.object({
    email: joi.string().trim().email().lowercase().required().label("Email")
});

// Forgot password validator
const forgotPasswordValidator = joi.object({
    email: joi.string().trim().email().lowercase().required().label("Email")
});

// Verify password reset token validator
const verifyPasswordResetTokenValidator = joi.object({
    email: joi.string().trim().email().lowercase().required().label("Email"),
    passwordResetToken: joi.string().trim().length(6).required().label("OTP")
});

// Reset password validator
const resetPasswordValidator = joi.object({
    passwordResetToken: joi.string().trim().length(6).required().label("OTP"),
    email: joi.string().trim().email().lowercase().required().label("Email"),
    newPassword: joi.string().min(8).max(128).pattern(new RegExp(passowrdPattern)).required().messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        "string.min": "Password must be at least 8 characters long."
    }).label("New Password"),    
});

module.exports = { userSignupValidator, userLoginValidator, verifyOtpValidator, resendOtpValidator,
forgotPasswordValidator, verifyPasswordResetTokenValidator, resetPasswordValidator };