"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import '/css/Flexcard.css';
import { useSession } from "next-auth/react";

const Flexcard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen"> 
      <div className="container mx-auto px-4 py-8 flex-grow ml-12">
        <div className="flex flex-wrap gap-8">
          <Link href="/jira">
            <div className="card">
              <Image
                src="/images/jira.png"
                width={500}
                height={500}
                className="card-image"
                alt="Jira"
              />
              <div className="flex-grow">
                <h3 className="card-heading">Jira Software</h3>
                <p className="card-text">
                  Track software development projects, from issue creation to resolution.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/confluence">
            <div className="card">
              <Image
                src="/images/confluence.png"
                width={500}
                height={500}
                className="card-image"
                alt="Confluence"
              />
              <div className="flex-grow">
                <h3 className="card-heading">Confluence</h3>
                <p className="card-text">
                  Collaborative workspace to share and manage knowledge.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/sonarqube">
            <div className="card">
              <Image
                src="/images/SonarQube.png"
                width={500}
                height={500}
                className="card-image"
                alt="SonarQube"
              />
              <div className="flex-grow">
                <h3 className="card-heading">SonarQube</h3>
                <p className="card-text">
                  Git repository management solution designed for professional teams.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/devops">
            <div className="card">
              <Image
                src="/images/devops.png"
                width={500}
                height={500}
                className="card-image"
                alt="Devops"
              />
              <div className="flex-grow">
                <h3 className="card-heading">DevOps</h3>
                <p className="card-text">
                  Messaging app for teams that makes it easy to communicate and collaborate.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/jiraCloud">
            <div className="card">
              <Image
                src="/images/jiracloud.png"
                width={500}
                height={500}
                className="card-image"
                alt="Jira Cloud"
              />
              <div className="flex-grow">
                <h3 className="card-heading">Jira SaaS</h3>
                <p className="card-text">
                  Hosts your source code projects in a variety of different programming languages and keeps track of the various changes made.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/confluenceCloud">
            <div className="card">
              <Image
                src="/images/confluence-cloud.png"
                width={500}
                height={500}
                className="card-image"
                alt="Confluence Cloud"
              />
              <div className="flex-grow">
                <h3 className="card-heading">Confluence SaaS</h3>
                <p className="card-text">
                  Hosts your source code projects in a variety of different programming languages and keeps track of the various changes made.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/genai">
            <div className="card">
              <Image
                src="/images/genai.png"
                width={500}
                height={500}
                className="card-image"
                alt="GenAi"
              />
              <div className="flex-grow">
                <h3 className="card-heading">GenAI</h3>
                <p className="card-text">
                  Hosts your source code projects in a variety of different programming languages and keeps track of the various changes made.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Flexcard;