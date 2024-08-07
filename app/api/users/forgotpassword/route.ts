import prisma from "../../../../database/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    //finding user in database

    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);

    const tokenData = {
      id: user?.id,
    };

    if (user) {
      const hashedToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!);
      console.log(hashedToken);

      //sending mail to for reset password

      // const response = await Resend.emails.send({
      //   from: process.env.MAILTRAP_FROM_EMAIL,
      //   to: email.split(','), 
      //   subject: "Reset your password",
      //   html: `<p>Click <a href="${process.env.DOMAIN}/reset/${hashedToken}">here</a> to reset your password</p>`,
      // });
  
      return NextResponse.json({ message: "success" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}

