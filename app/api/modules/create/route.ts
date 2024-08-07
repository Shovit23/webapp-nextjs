import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../helper/auth";
import prisma from "../../../../database/dbconfig";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
    const reqBody = await req.json();
    const { moduleKey, moduleName, moduleDescription, moduleOwner } = reqBody;
    const moduleExist = await prisma.modules.findUnique({
      where: {
        moduleName: moduleName,
      },
    });
    if (moduleExist) {
      return NextResponse.json(
        { message: "Module Already Exist" },
        { status: 400 }
      );
    }
    const module = await prisma.modules.create({
      data: {
        moduleKey: moduleKey,
        moduleName: moduleName,
        moduleDescription: moduleDescription,
        moduleOwner: moduleOwner,
      },
    });
    return NextResponse.json(
      { message: "Module Created", module },
      { status: 200 }
    );
  } 
  catch (e:any) {
    return NextResponse.json({error: e.message},{status:500})
  }
}

  else {
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
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

    const { moduleKey, moduleName, moduleDescription, moduleOwner } = reqBody;
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
        const moduleNameExist = await prisma.modules.findUnique({
          where: {
            moduleName: moduleName,
          },
        });
        const moduleKeyExist = await prisma.modules.findUnique({
            where: {
              moduleKey: moduleKey,
            },
          });
        if (moduleNameExist) {
          return NextResponse.json(
            { message: "Module Name already Exist, Please give a different name" },
            { status: 400 }
          );
        }
        if (moduleKeyExist) {
            return NextResponse.json(
              { message: "Module Key already Exist, Please give a different key" },
              { status: 400 }
            );
          }
        const module = await prisma.modules.create({
          data: {
            moduleKey: moduleKey,
            moduleName: moduleName,
            moduleDescription: moduleDescription,
            moduleOwner: moduleOwner,
          },
        });
        return NextResponse.json(
          { message: "Module Created", module },
          { status: 200 }
        );
      } catch (e: any) {
        console.log("Create module api was triggered by : " , isValidtoken.email)
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    }
    else{
        return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  }
}
