import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../helper/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const reqBody = await req.json();
    const role = reqBody;
    const isRoleExist = await prisma.roles.findUnique({
      where: {
        roleName: role,
      },
    });
    if (isRoleExist) {
      return NextResponse.json(
        { message: "Role already exists" },
        { status: 500 }
      );
    } else {
      try {
        const addRole = await prisma.roles.create({
          data: {
            roleName: role,
          },
        });
        console.log(addRole);
        return NextResponse.json(
          { message: "Role created sucessfully" },
          { status: 200 }
        );
      } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
    }
  } else {
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json({ error: "Please provide a role" }, { status: 400 });
    }
  
    if (!reqBody || Object.keys(reqBody).length === 0) {
      return NextResponse.json({ error: "Please provide a role" }, { status: 400 });
    }
  
    const { role } = reqBody;
    const authHeader = req.headers.get('authorization');
    let token;
    
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
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
      const isRoleExist = await prisma.roles.findUnique({
        where: {
          roleName: role,
        },
      });
      if (isRoleExist) {
        return NextResponse.json(
          { message: "Role already exists" },
          { status: 500 }
        );
      } else {
        try {
          const addRole = await prisma.roles.create({
            data: {
              roleName: role,
            },
          });
          console.log(
            "Add role Api was triggered by username: " + isValidtoken.email
          );
          return NextResponse.json(
            { message: "Role created sucessfully" },
            { status: 200 }
          );
        } catch (e: any) {
          return NextResponse.json({ error: e.message }, { status: 400 });
        }
      }
    } else {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  }
}
