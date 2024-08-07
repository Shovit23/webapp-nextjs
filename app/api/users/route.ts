import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../helper/auth";


export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    if(session){
        try {
            const usersWithRoles = await prisma.user.findMany({
                include: {
                  userRoles: true, // Include the userRoles relation
                },
              });

              return NextResponse.json({
                Message : "User list",
                Success: true,
                Data: usersWithRoles
            }, {status:200});
            
        } catch (e:any) {
            return NextResponse.json({
                error:e.message,
            }, {status:400});
        }
    }
    else{
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
            try {
                const usersWithRoles = await prisma.user.findMany({
                    include: {
                      userRoles: true, // Include the userRoles relation
                    },
                  });
                  console.log(
                    "Get userlist Api was triggered by username: " + isValidtoken.email
                  );
                  return NextResponse.json({
                    Message : "User list",
                    Success: true,
                    Data: usersWithRoles
                }, {status:200});
                
            } catch (e:any) {
                return NextResponse.json({
                    error:e.message,
                }, {status:400});
            }
          }
          else{
            return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
          }
    }
}