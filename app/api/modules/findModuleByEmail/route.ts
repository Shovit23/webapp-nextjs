import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../helper/auth";
import prisma from "../../../../database/dbconfig";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

    if (session) {
      const email = session.user.email;
      try {
      if (email) {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            module: true,
          },
        });
        const modules = user?.module;
        return NextResponse.json({ list: modules });
      }
      return NextResponse.json(
        { message: "No module exist for the user : ", email },
        { status: 400 }
      );
    }
    catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
  }
  else{
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { error: "Please provide user's email" },
        { status: 400 }
      );
    }

    if (!reqBody || Object.keys(reqBody).length === 0) {
      return NextResponse.json(
        { error: "Please provide user's email" },
        { status: 400 }
      );
    }

    const { email } = reqBody;
    console.log(email);
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
    if (isValidtoken){
      try {
        if (email) {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
            include: {
              module: true,
            },
          });
          const modules = user?.module;
          return NextResponse.json({ list: modules });
        }
        return NextResponse.json(
          { message: "No module exist for the user : ", email },
          { status: 400 }
        );
      }
      catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
    }
  }
    
  } 
