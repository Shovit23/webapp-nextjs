import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../helper/auth";
import prisma from "../../../database/dbconfig";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const services = await prisma.services.findMany({
              });
              return NextResponse.json({services}, {status: 200});
        } catch (e:any) {
            return NextResponse.json({error: e.message},{status:500})
        }
    }
    else{
        const authHeader = req.headers.get("authorization");
        let token
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
                });
                return NextResponse.json({services}, {status: 200});
                  
            } catch (e:any) {
                NextResponse.json({error: e.message},{status:500})
            }
          }
          else{
            return NextResponse.json({ message: "Token Invalid" }, { status: 401 });
          }
    }
}