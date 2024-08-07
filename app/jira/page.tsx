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
        <Link href={"/jira/monthlyMetrics"}><Card heading="Monthly Metrics" /></Link>
        <Link href={"/jira/licence-reclaim"}><Card heading="License Reclaimation" /></Link>
        <Link href={"/jira/project-provisioning"}><Card heading="Project Provisioning" /></Link>
        <Link href={"/jira/user-provisioning"}><Card heading="User Provisioning" /></Link>
        <Link href={"/jira/misc/attachment"}><Card heading="Jira Extraction" /></Link>
        <Link href={"/jira/misc/board-creation"}><Card heading="Board Creation" /></Link>
        <Link href={"/jira/misc/testdata-creation"}><Card heading="Test Data Creation" /></Link>
        <Link href={"/jira/misc/pmt-creation"}><Card heading="PMT Creation" /></Link>
        <Link href={"/jira/misc/api-testing"}><Card heading="API Testing"/></Link>
      </div>
    </div>
  );
};

export default Page;