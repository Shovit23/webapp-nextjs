
import { NextRequest, NextResponse } from "next/server";
import { getUserRoles } from "../../../../helper/getRolesByID";
import prisma from "../../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../helper/auth";
  
  export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session) {
      const reqBody = await req.json();
    const { id } = reqBody;
    console.log(id)


    if (!id) {
        return NextResponse.json(
            { message: "Please provide user id" },
            { status: 500 }
          );
      }const checkId = await prisma.userRoles.findMany({
        where: {
            userId: id,
        }
    })
    if(checkId.length === 0){
        return NextResponse.json(
            { message: "User Does not exist" },
            { status: 500 }
          );
    }
        else{
            try {
                const roles = await getUserRoles(parseInt(id));
                return NextResponse.json(
                    { roles: roles},
                    { status: 200 }
                  );
              } catch (e:any) {
                return NextResponse.json({ error: e.message }, { status: 400 });
                
              }
        }
    
    }
    else{
      let reqBody;
      try {
        reqBody = await req.json();
      } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: "Please provide a Id" }, { status: 400 });
      }
    
      if (!reqBody || Object.keys(reqBody).length === 0) {
        return NextResponse.json({ error: "Please provide a Id" }, { status: 400 });
      }

    const { id } = reqBody;
    console.log(id)
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
      if (!id) {
        return NextResponse.json(
            { message: "Please provide user id" },
            { status: 500 }
          );
      }const checkId = await prisma.userRoles.findMany({
        where: {
            userId: id,
        }
    })
    if(checkId.length === 0){
        return NextResponse.json(
            { message: "User Does not exist" },
            { status: 500 }
          );
    }
        else{
            try {
                const roles = await getUserRoles(parseInt(id));
                console.log(
                  "Get role by id Api was triggered by username: " + isValidtoken.email
                );
                return NextResponse.json(
                    { roles: roles},
                    { status: 200 }
                  );
              } catch (e:any) {
                return NextResponse.json({ error: e.message }, { status: 400 });
                
              }
        }
    }
    else{
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    
    
    }
    
  }
