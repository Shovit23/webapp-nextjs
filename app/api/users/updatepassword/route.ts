import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../database/dbconfig";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password, tokenData } = reqBody;
    const hashedToken = tokenData.params.token;
    const decodedToken: any = Jwt.verify(hashedToken, process.env.JWT_SECRET_KEY!);
    const userId = decodedToken.id
    const user = await prisma.user.findUnique({ where: { id: userId } });
    console.log(user);

    const salt = await bcryptjs.genSalt(10); 
    const hashedPassword = await bcryptjs.hash(password, salt);


    const updatedPassword = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
