import prisma from '../../../../database/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import toast from 'react-hot-toast';


export async function POST(req : NextRequest){
  try {
    const reqBody = await req.json()
    const {username, email, password} = reqBody

    //checking if user already exist
    const userPresent = await prisma.user.findUnique({
      where: {email}
    })

    if (userPresent){
      console.log(userPresent)
      console.log("User already exist")
      //toast.error("User already exist")
      return NextResponse.json({error: 'User already exist'}, {status: 400});
    }

    //if user not present the go forward with hashing the password

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)


    //creating user
    const newUser = await prisma.user.create({
      data : {
        username,
        email,
        password : hashedPassword,
      }
    });

    //Assigning default role as user
    const defaultRole = await prisma.userRoles.create({
      data: {
        userId: newUser.id,
        roleName: "Detas-User"
      }
    })

    const {password: newUserPassword, ...rest} = newUser;
    console.log("User created sucessfully ", rest)
    return NextResponse.json({
      message: 'User created successfully!',
      success: true ,
      user: rest});

  } catch (e:any) {
    return NextResponse.json({error: e.message}, {status: 500});
  }
}
