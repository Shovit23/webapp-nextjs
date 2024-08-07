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
      const services = await prisma.services.findMany({
        where: {
          moduleName: moduleName,
        },
      });
      if (services.length === 0) {

        return NextResponse.json(
          { error: "No service exists for the given module" },
          { status: 404 } 
        );
      }
      const serviceNames = services.map(service => service.serviceName);
      return NextResponse.json({ serviceNames }, { status: 200 });
    } catch (e: any) {
      console.log(e.message);
      return NextResponse.json(
        { error: "No service exist for the given module" },
        { status: 400 }
      );
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
    const { moduleName } = reqBody;
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
        const services = await prisma.services.findMany({
          where: {
            moduleName: moduleName,
          },
        });
        if (services.length === 0) {

            return NextResponse.json(
              { error: "No service exists for the given module" },
              { status: 404 } 
            );
          }
        //const serviceNames = services.map(service => service.serviceName);
      return NextResponse.json({ services }, { status: 200 });
      } catch (e: any) {
        console.log(e.message);
        return NextResponse.json(
          { error: "No service exist for the given module" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  }
}
