import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const reqBody = await req.json();
    const {projectkey} = reqBody;
    console.log(projectkey)
    const token = process.env.SonarQube_Token || '';

    try {
        const res = await axios.get('https://stagesonarqube.deloitte.com/api/components/show', {
            params: {
              component: projectkey,
            },
            auth: {
                username: token,
                password: '',
              },
        });

        if (res.status == 200){
            return NextResponse.json({message:1}, {status:400})
        }
  
    } catch (e:any) {
        return NextResponse.json(
            { message: 0},
            { status: 200 }
          );
    }
}