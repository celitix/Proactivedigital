import { JobStatus } from "../../generated/prisma/enums";
import { errorHandler, responseHandler } from "../lib/helper";
import { prisma } from "../lib/prisma";
import { Request, Response, NextFunction } from "express";

const create = async (req: Request, res: Response) => {
  try {
    const {
      title,
      location,
      type,
      jobDesc,
      responsibilities,
      qualifications,
      status,
    } = req.body;

    const isJobCreate = await prisma.job.create({
      data: {
        title,
        location,
        type,
        jobDesc,
        responsibilities,
        qualifications,
        status,
      },
    });

    if (!isJobCreate)
      return responseHandler(
        res,
        { message: "Job not created", status: false },
        400,
      );

    return responseHandler(
      res,
      { message: "Job created successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const getAllJobs = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string;

    let where: {
      status?: JobStatus;
    } = {
      status: JobStatus.PUBLISHED,
    };

    if (type == "admin") {
      where = {};
    }

    const allJobs = await prisma.job.findMany({ where });
    return responseHandler(
      res,
      { message: "Job fetched successfully", status: true, data: allJobs },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const updateJobStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const isJobExist = await prisma.job.findUnique({ where: { id } });

    if (!isJobExist)
      return responseHandler(
        res,
        { message: "Job not found", status: false },
        400,
      );

    const isJobUpdate = await prisma.job.update({
      where: { id },
      data: { status: status },
    });

    if (!isJobUpdate)
      return responseHandler(
        res,
        { message: "Job not updated", status: false },
        400,
      );
    return responseHandler(
      res,
      { message: "Job fetched successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

export { create, getAllJobs, updateJobStatus };
