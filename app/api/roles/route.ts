import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../helper/auth";

export async function GET(req: NextRequest){
    const session = await getServerSession(authOptions);
  if (session) 
    {try 
      {
    const roles = await prisma.roles.findMany()
    return NextResponse.json({roles: roles}, {status:200})
} catch (e:any) {
    return NextResponse.json({error: e.message}, {status:500})
}}
else{
    const authHeader = req.headers.get('authorization');
    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
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
        try {
            const roles = await prisma.roles.findMany()
            console.log(
              "Get roles Api was triggered by username: " + isValidtoken.email
            );
            return NextResponse.json({roles: roles}, {status:200})
        } catch (e:any) {
            return NextResponse.json({error: e.message}, {status:500})
        }
    }
    else{
        return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
}
    
}