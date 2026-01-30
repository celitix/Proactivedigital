import { errorHandler, responseHandler } from "../lib/helper";
import { prisma } from "../lib/prisma";
import { Request, Response, NextFunction } from "express";

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

const sendOtp = async (req: any, res: Response) => {};
const verifyOtp = async (req: any, res: Response) => {};

export { contact, career };
