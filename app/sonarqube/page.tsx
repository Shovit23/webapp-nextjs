import Link from "next/link";
import Card from "../../components/Card";
import SideNavbar from "../../components/SideNavbar";

const Page = () => {
  return (
    <div className="flex h-full bg-gray-200 text-black">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className="flex-col grid grid-cols-3 items-center w-3/4 py-8 row-gap-4 mb-20 mr-24">
        <Link href={"/sonarqube/monthlyMetrics"}>
          <Card heading="Monthly Metrics" />
        </Link>
        <Link href={"/sonarqube/licence-reclaim"}>
          <Card heading="Liscence Reclaimation" />
        </Link>
        <Link href={"/sonarqube/project-provisioning"}>
          <Card heading="Project Provisioning" />
        </Link>
        <Link href={"/sonarqube/user-provisioning"}>
          <Card heading="User Provisioning" />
        </Link>
        <Link href={"/sonarqube/misc/scan"}>
          <Card heading="Scans" />
        </Link>

        <Link href={"/sonarqube/misc/apitesting"}>
          <Card heading="API Testing" />
        </Link>
      </div>
    </div>
  );
};

export default Page;
