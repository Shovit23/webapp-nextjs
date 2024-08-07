import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../helper/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const reqBody = await req.json();
    const { id } = reqBody;
    console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: "Please provide user id" },
        { status: 500 }
      );
    } else {
      try {
        //for deleting user roles
        const deleteUserRoles = await prisma.userRoles.deleteMany({
          where: {
            userId: id,
          },
        });
        //for deleting user
        const deleteUser = await prisma.user.delete({
          where: {
            id: id,
          },
        });

        try {
          // for deleting user token
          const deleteToken = await prisma.userToken.delete({
            where: {
              id: id,
            },
          });
        } catch (e: any) {
          console.log("no token found for this user");
        }

        return NextResponse.json(
          {
            message: "User deleted Sucesssfully",
            username: deleteUser.username,
          },
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
      return NextResponse.json({ error: "Please provide Id" }, { status: 400 });
    }
  
    if (!reqBody || Object.keys(reqBody).length === 0) {
      return NextResponse.json({ error: "Please provide Id" }, { status: 400 });
    }

    const { id } = reqBody;
    console.log(id);
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
      const isUserPresent = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!isUserPresent) {
        return NextResponse.json(
          { message: "User Not Found" },
          { status: 404 }
        );
      } else {
        try {
          //for deleting user roles
          const deleteUserRoles = await prisma.userRoles.deleteMany({
            where: {
              userId: id,
            },
          });
          //for deleting user
          const deleteUser = await prisma.user.delete({
            where: {
              id: id,
            },
          });

          try {
            // for deleting user token
            const deleteToken = await prisma.userToken.delete({
              where: {
                id: id,
              },
            });
          } catch (e: any) {
            console.log("no token found for this user");
          }
          console.log(
            "Delete user Api was triggered by username: " + isValidtoken.email
          );
          return NextResponse.json(
            {
              message: "User deleted Sucesssfully",
              username: deleteUser.username,
            },
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
