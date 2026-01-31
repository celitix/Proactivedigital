import { errorHandler, responseHandler } from "../lib/helper";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const create = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      shortDesc,
      content,
      category,
      tags,
      publishedDate,
      seo,
      status,
    } = req.body;

    if (!req.file) {
      return responseHandler(
        res,
        { message: "No file uploaded", status: false },
        201,
      );
    }

    await prisma.blog.create({
      data: {
        title,
        slug,
        shortDesc,
        content,
        category,
        tags,
        publishedDate,
        seo,
        status,
        image: req.file.path,
      },
    });
    return responseHandler(
      res,
      { message: "Blog created successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const all = async (req: Request, res: Response) => {
  try {
    return responseHandler(
      res,
      { message: "Blogs fetched successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const byId = async (req: Request, res: Response) => {
  try {
    return responseHandler(
      res,
      { message: "Blog fetched successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    return responseHandler(
      res,
      { message: "Blog updated successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const deleteB = async (req: Request, res: Response) => {
  try {
    return responseHandler(
      res,
      { message: "Blog deleted successfully", status: true },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

export { create, all, byId, update, deleteB };
