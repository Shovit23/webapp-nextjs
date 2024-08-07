import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const reqBody = await req.json();
    const {username, permission, projectkey} = reqBody;
    console.log(username)
    const token = process.env.SonarQube_Token || '';
    try {
      const res = await axios.post('https://stagesonarqube.deloitte.com/api/permissions/add_user', null, {
          params: {
            login : username,
            permission: permission,
            projectKey: projectkey
          },
          auth: {
            username: token,
            password: '',
          },
        });

        return NextResponse.json(
            { message: "User added sucessfully"},              
            { status: 200 }
          );
  
    } catch (e:any) {
        console.log(e)
        return NextResponse.json(
            { message: e},
            { status: 500 }
          );
    }
}
