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
            <Link href={"/confluence/monthlyMetrics"}><Card heading="Method Concierge" /></Link>
        <Link href={"/confluence/licence-reclaim"}> <Card heading="Text to SQL" /></Link>
        <Link href={"/confluence/project-provisioning"}> <Card heading="Text to Reports" /></Link>
        <Link href={"/confluence/user-provisioning"}><Card heading="Knowledge Base" /></Link>

                
               
     
                
            </div>
        </div>
    );
};

export default Page;