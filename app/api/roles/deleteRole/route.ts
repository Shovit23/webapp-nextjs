import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../helper/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const reqBody = await req.json();
    const { role } = reqBody;
    const existRole = await prisma.roles.findUnique({
      where: {
        roleName: role,
      },
    });
    if (existRole) {
      try {
        const deleteRole = await prisma.roles.delete({
          where: {
            roleName: role,
          },
        });
        console.log(deleteRole);
        return NextResponse.json(
          { message: "Role deleted successfully" },
          { status: 200 }
        );
      } catch (e: any) {
        return NextResponse.json({ errro: e.message }, { status: 400 });
      }
    } else {
      return NextResponse.json(
        { message: "Roles does not exist" },
        { status: 404 }
      );
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
      const existRole = await prisma.roles.findUnique({
        where: {
          roleName: role,
        },
      });
      if (existRole) {
        try {
          const deleteRole = await prisma.roles.delete({
            where: {
              roleName: role,
            },
          });
          console.log(
            "Delete role Api was triggered by username: " + isValidtoken.email
          );
          return NextResponse.json(
            { message: "Role deleted successfully" },
            { status: 200 }
          );
        } catch (e: any) {
          return NextResponse.json({ errro: e.message }, { status: 400 });
        }
      } else {
        return NextResponse.json(
          { message: "Roles does not exist" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
}
