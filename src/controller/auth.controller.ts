import { errorHandler, responseHandler } from "../lib/helper";
import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  try {
    // const { name, email, mobile, age, gender } = req.body;
    // await prisma.users.create({
    //   data: {
    //     name,
    //     email,
    //     mobile,
    //     age,
    //     gender,
    //   },
    // });

    // return responseHandler(
    //   res,
    //   { message: "User created successfully", status: true },
    //   201
    // );
  } catch (e: any) {
    // errorHandler(e.message);
  }
};

export { register };
