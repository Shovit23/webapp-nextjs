import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../database/dbconfig";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { token } = reqBody;

  try {
    const user = await prisma.userToken.findFirst({
        where: {
            token: token
        }
    });
    console.log(user?.id);

    if (user) {
      return NextResponse.json({ message: "Token verified" });
    } else {
      return NextResponse.json({ message: "Invalid token" });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
