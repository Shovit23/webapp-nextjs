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
            <Link href={"/confluence/monthlyMetrics"}><Card heading="Monthly Metrics"/></Link>
        <Link href={"/confluence/licence-reclaim"}><Card heading="Liscence Reclaimation"  /></Link>
        <Link href={"/confluence/project-provisioning"}><Card heading="Project Provisioning" /></Link>
        <Link href={"/confluence/user-provisioning"}><Card heading="User Provisioning" /></Link>
        <Link href={"/confluence/misc/space-creation"}><Card heading="Space Creation"/></Link>
        <Link href={"/confluence/misc/testdata-creation"}><Card heading="Test Data Creation" /></Link>
        <Link href={"/confluence/misc/api-testing"}><Card heading="API Testing"/></Link>
            </div>
        </div>
    );
};

export default Page;