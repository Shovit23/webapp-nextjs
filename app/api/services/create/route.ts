import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../helper/auth";
import prisma from "../../../../database/dbconfig";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const reqBody = await req.json();
      const { serviceName, serviceDescription, moduleName } = reqBody;
      const ismoduleName = await prisma.modules.findUnique({
        where: {
          moduleName: moduleName,
        },
      });
      if (!ismoduleName) {
        return NextResponse.json(
          { message: "Module name not found" },
          { status: 404 }
        );
      }
      const isService = await prisma.services.findUnique({
        where: {
          serviceName: serviceName,
        },
      });
      if (isService) {
        return NextResponse.json(
          { message: "Service already exists" },
          { status: 409 }
        );
      }
      const service = await prisma.services.create({
        data: {
          serviceName: serviceName,
          serviceDescription: serviceDescription,
          moduleName: moduleName,
        },
      });
      return NextResponse.json(
        { message: "Service created successfully", service },
        { status: 201 }
      );
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  } else {
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (e) {
      console.error("Error parsing request body:", e);
      return NextResponse.json(
        { error: "Please provide the required paremeters" },
        { status: 400 }
      );
    }
    if (!reqBody || Object.keys(reqBody).length === 0) {
        return NextResponse.json(
          { error: "Please provide the required paremeters" },
          { status: 400 }
        );
      }
      const { serviceName, serviceDescription, moduleName } = reqBody;
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
        const ismoduleName = await prisma.modules.findUnique({
            where: {
              moduleName: moduleName,
            },
          });
          if (!ismoduleName) {
            return NextResponse.json(
              { message: "Module Name not found" },
              { status: 404 }
            );
          }
          const isService = await prisma.services.findUnique({
            where: {
              serviceName: serviceName,
            },
          });
          if (isService) {
            return NextResponse.json(
              { message: "Service already exists" },
              { status: 409 }
            );
          }
          const service = await prisma.services.create({
            data: {
              serviceName: serviceName,
              serviceDescription: serviceDescription,
              moduleName: moduleName,
            },
          });
          return NextResponse.json(
            { message: "Service created successfully", service },
            { status: 201 }
          );
      }
      else{
        return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
      }
  }
}
