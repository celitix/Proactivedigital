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

    prisma.$transaction(async (tx) => {
      const seoData = await tx.seo.create({
        data: {
          title: seo.title,
          description: seo.desc,
          keywords: seo.keywords,
        },
      });
      await tx.blog.create({
        data: {
          title,
          slug,
          shortDesc,
          content,
          category,
          tags,
          publishedDate,
          seoId: seoData.id,
          status: status.toUpperCase(),
          image: req.file!.path,
        },
      });
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const orderBy = (req.query.orderBy as string) || "desc";
    const type = (req.query.type as string) || "all";

    let where = {};
    if (type == "published") {
      where = {
        status: "PUBLISHED",
      };
    }

    if (type == "draft") {
      where = {
        status: "DRAFT",
      };
    }

    const blogs = await prisma.blog.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        shortDesc: true,
        category: true,
        publishedDate: true,
        image: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: orderBy === "asc" ? "asc" : "desc",
      },
    });

    const totalBlogLength = await prisma.blog.count({
      where,
    });

    return responseHandler(
      res,
      {
        message: "Blogs fetched successfully",
        status: true,
        blogs,
        meta: {
          total: totalBlogLength,
          totalPages: Math.ceil(totalBlogLength / limit),
          currentPage: page,
          limit,
        },
      },
      201,
    );
  } catch (e: any) {
    errorHandler(e.message);
  }
};

const byId = async (req: Request, res: Response) => {
  try {
    const idParam = req.query.id;

    const id = typeof idParam === "string" ? idParam : undefined;

    if (!id) {
      return responseHandler(
        res,
        { message: "Id is required", status: false },
        400,
      );
    }

    const isBlogExist = await prisma.blog.findUnique({
      where: { id },
      include: {
        seo: {
          select: {
            title: true,
            description: true,
            keywords: true,
          },
        },
      },
    });

    if (!isBlogExist) {
      return responseHandler(
        res,
        { message: "Blog not found", status: false },
        400,
      );
    }
    return responseHandler(
      res,
      { message: "Blog fetched successfully", status: true, blog: isBlogExist },
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
