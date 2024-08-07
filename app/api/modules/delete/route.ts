import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../helper/auth";
import prisma from "../../../../database/dbconfig";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const reqBody = await req.json();
    const { moduleName } = reqBody;

    try {
      const moduleExist = await prisma.modules.findUnique({
        where: {
          moduleName: moduleName,
        },
      });
      if (moduleExist) {
        await prisma.services.deleteMany({
          where: {
            moduleName: moduleName,
          },
        });
        await prisma.modules.delete({
          where: {
            moduleName: moduleName,
          },
        });
        
      } else {
        return NextResponse.json(
          { message: "Module Not Found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Module deleted Sucessfully" },
        { status: 201 }
      );
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  } else {
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { error: "Please provide Module Key" },
        { status: 400 }
      );
    }

    if (!reqBody || Object.keys(reqBody).length === 0) {
      return NextResponse.json(
        { error: "Please provide Module Key" },
        { status: 400 }
      );
    }

    const { moduleName } = reqBody;
    console.log(moduleName);
    const authHeader = req.headers.get("authorization");
    let token;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      return NextResponse.json({ message: "Token Required" }, { status: 401 });
    }
    const isValidtoken = await prisma.userToken.findUnique({
      where: {
        token: token,
      },
    });
    if (isValidtoken) {
      try {
        const moduleExist = await prisma.modules.findUnique({
          where: {
            moduleName: moduleName,
          },
        });

        if (moduleExist) {
          await prisma.services.deleteMany({
            where: {
              moduleName: moduleName,
            },
          });
          await prisma.modules.delete({
            where: {
              moduleName: moduleName,
            },
          });
        } else {
          return NextResponse.json(
            { message: "Module Not Found" },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { message: "Module deleted Sucessfully" },
          { status: 201 }
        );
      } catch (e: any) {
        console.log(e);
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  }
}
