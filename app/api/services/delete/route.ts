import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../helper/auth";
import prisma from "../../../../database/dbconfig";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session) {
        const reqBody = await req.json();
        const { serviceId } = reqBody;
        try {
            const serviceExist = await prisma.services.delete({
                where: {
                    serviceId: serviceId
                }
            })
            console.log(serviceExist)
            return NextResponse.json({message: "Service deleted sucessfully ", serviceExist},{status:200})
        } catch (e:any) {
            return NextResponse.json({message: "Service does not exist"}, {status:400})
        }
    }
    else{
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
      const { serviceId } = reqBody;
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
            const serviceExist = await prisma.services.delete({
                where: {
                    serviceId: serviceId
                }
            })
            console.log(serviceExist)
            return NextResponse.json({message: "Service deleted sucessfully " , serviceExist}, {status:200})
        } catch (e:any) {
            return NextResponse.json({message: "Service does not exist"}, {status:400})
        }
      }
      else{
        return NextResponse.json({message: "Invalid Token"}, {status:401})
      }
    }
}