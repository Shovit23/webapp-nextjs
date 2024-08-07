import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../database/dbconfig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../helper/auth";


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    const reqBody = await req.json()
    const { userId, roles } = reqBody;
    console.log(roles, userId);
  
    if (!userId ||!roles || Array.isArray(roles) === false) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 500 });
    }
  
      try {
  
        // If no valid roles were found in database, return an error
        const allRoles = await prisma.roles.findMany();
  
        //to delete existing roles
        const user = await prisma.userRoles.findMany({
          where: {
            userId: userId,
          }
        })
        console.log(user)
        if (user){
          await prisma.userRoles.deleteMany({
            where: {
              userId: userId,
            },
          });
        }
        
          for (let role of roles) {
            console.log({ userId, role });
            await prisma.userRoles.create({
              data: {
                userId: userId,
                roleName: role,
              },
            });
    
          }
        
        return NextResponse.json({ message: "Role updated" }, { status: 200 });
      } catch (e: any) {
        console.log(e)
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
  
  }
  else{
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json({ error: "Please provide user Id and  role" }, { status: 400 });
    }
  
    if (!reqBody || Object.keys(reqBody).length === 0) {
      return NextResponse.json({ error: "Please provide user Id and role" }, { status: 400 });
    }

    const { userId, roles} = reqBody;
    console.log(roles, userId);
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
      if (!userId ||!roles || Array.isArray(roles) === false) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 500 });
      }
      
    
        try {
    
          // If no valid roles were found in database, return an error
          const allRoles = await prisma.roles.findMany();
          const validRoles = roles.filter(role => allRoles.some(r => r.roleName === role));
          if (validRoles.length === 0) {
            return NextResponse.json({ error: "None of the requested roles are allowed." }, { status: 403 });
          }
          //to delete existing roles
          const user = await prisma.userRoles.findMany({
            where: {
              userId: userId,
            }
          })
          console.log(user)
          if (user){
            await prisma.userRoles.deleteMany({
              where: {
                userId: userId,
              },
            });
          }
          
            for (let role of roles) {
              console.log({ userId, role });
              await prisma.userRoles.create({
                data: {
                  userId: userId,
                  roleName: role,
                },
              });
      
            }
            console.log(
              "Update role Api was triggered by username : " +  isValidtoken.email
            );
          return NextResponse.json({ message: "Role updated" }, { status: 200 });
        } catch (e: any) {
          console.log(e)
          return NextResponse.json({ error: e.message }, { status: 500 });
        }
    }
    else{
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
  
  }
 
  
}

