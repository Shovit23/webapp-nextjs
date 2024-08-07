import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../helper/auth";
import prisma from "../../../../database/dbconfig";
import { nanoid } from "nanoid";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const email = session.user.email + "";

      const nanotoken = nanoid(48); // random token

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        const userAccessDetails = await prisma.userToken.findUnique({
          where: {
            email: email,
          },
        });

        if (userAccessDetails) {
          const updatedToken = await prisma.userToken.update({
            where: {
              email: email,
            },
            data: {
              token: nanotoken,
              id: user.id,
            },
          });
        } else {
          const storeToken = await prisma.userToken.create({
            data: {
              email: user.email,
              token: nanotoken,
              id: user.id,
            },
          });
        }
      }

      return NextResponse.json(
        { message: "Token generated sucessfully", token: nanotoken },
        { status: 200 }
      );
    } catch (e: any) {
      return NextResponse.json({ error: e.message });
    }
  } else {
      
      let reqBody;
      try {
        reqBody = await req.json();
      } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: "Please provide email and password" }, { status: 400 });
      }
    
      if (!reqBody || Object.keys(reqBody).length === 0) {
        return NextResponse.json({ error: "Please provide email and password" }, { status: 400 });
      }
  
    console.log(reqBody)
    
    const { email, password } = reqBody;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" },{status:400});
      } else {
        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid) {
          return NextResponse.json({ error: "Invalid password" }, {status:400});
        } else {
          const nanotoken = nanoid(48);
          const userAccessDetails = await prisma.userToken.findUnique({
            where: {
              email: email,
            },
          });

          if (userAccessDetails) {
            const updatedToken = await prisma.userToken.update({
              where: {
                email: email,
              },
              data: {
                token: nanotoken,
                id: user.id,
              },
            });
          } else {
            const storeToken = await prisma.userToken.create({
              data: {
                email: user.email,
                token: nanotoken,
                id: user.id,
              },
            });
          }
          console.log(
            "Generate token Api was triggered by username: " + user.email
          );
          return NextResponse.json(
            { message: "Token generated sucessfully", token: nanotoken },
            { status: 200 }
          );
        }
      }
    } catch (e: any) {
      return NextResponse.json({ error: e.message });
    }
  }
}
