

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { projectname, projectkey, username, permission} = reqBody;
  const token = process.env.SonarQube_Token || '';


  try {
    const res = await axios.post('https://stagesonarqube.deloitte.com/api/projects/create', null, {
      params: {
        name: projectname,
        project: projectkey,
      },
      auth: {
        username: token,
        password: '',
      },
    });
      // const res1 = await axios.post('https://stagesonarqube.deloitte.com/api/permissions/add_user', null, {
      //     params: {
      //       login : username,
      //       permission: permission,
      //       projectKey: projectkey
      //     },
      //     auth: {
      //       username: token,
      //       password: '',
      //     },
      //   });
        return NextResponse.json(
          { message: "Project Created sucessfully"},              
          { status: 200 }
        );
        

  } catch (error:any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
        { message: "Error creating project:" },
        { status: 500 }
      );
  }
}
