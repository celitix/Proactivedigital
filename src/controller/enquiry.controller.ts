import {
  errorHandler,
  generateOtp,
  hash,
  responseHandler,
  verifyHash,
} from "../lib/helper";
import { prisma } from "../lib/prisma";
import { Request, Response, NextFunction } from "express";
import { sendOtptoSMS } from "../lib/sendOtp";

const contact = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      companyName,
      service,
      message,
      source,
    } = req.body;

    await prisma.contactEnquiry.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
        companyName,
        service,
        message,
        source,
      },
    });
    return responseHandler(
      res,
      { message: "Enquiry created successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const career = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      designation,
      expInYears,
      jobTitle,
      resumeUrl,
      message,
    } = req.body;

    await prisma.carreerEnquiry.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
        designation,
        expInYears,
        jobTitle,
        resumeUrl,
        message,
      },
    });
    return responseHandler(
      res,
      { message: "Enquiry created successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;

    const appEnv = process.env.APP_ENV;
    const otp = generateOtp();
    const hashedOtp = appEnv == "dev" ? await hash("123456") : await hash(otp);

    const savedOtp = await prisma.otp.create({
      data: {
        mobile,
        otp: hashedOtp,
        expiry: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    const isSend = await sendOtptoSMS(otp, 5, mobile);
    if (!isSend)
      return responseHandler(
        res,
        { message: "Otp not sent. Please try again", status: false },
        400,
      );

    return responseHandler(
      res,
      { message: "Otp sent successfully", status: true, otpId: savedOtp.id },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};
const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { mobile, otpId, otp } = req.body;
    const isOtpExist = await prisma.otp.findUnique({
      where: { id: otpId, mobile },
    });

    if (!isOtpExist) {
      return responseHandler(
        res,
        { message: "Otp not found", status: false },
        400,
      );
    }

    if (isOtpExist.expiry < new Date(Date.now())) {
      await prisma.otp.deleteMany({ where: { id: otpId } });
      return responseHandler(
        res,
        { message: "Otp expired", status: false },
        400,
      );
    }

    const isValid = await verifyHash(otp, isOtpExist.otp);

    if (!isValid) {
      return responseHandler(
        res,
        { message: "Invalid otp", status: false },
        400,
      );
    }
    await prisma.otp.deleteMany({ where: { id: otpId } });
    return responseHandler(
      res,
      { message: "Otp verified successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

export { contact, career, sendOtp, verifyOtp };
