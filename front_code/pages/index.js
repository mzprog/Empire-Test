import Link from "next/link";
import CitySearch from "../Components/Forms/CitySearch";
import Logout from "../Components/Forms/Logout";
import MainLayout from "../Components/Layouts/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <div className="flex flex-col min-h-screen">
                <div className="bg-sky-300/70 shadow-xl border border-b-sky-300 shadow-sky-200 py-2 px-4">
                    <Link href="/">
                        <a className="font-bold text-white bg-black/20 p-4">
                            Empire Test
                        </a>
                    </Link>
                    <Logout />
                </div>
                <div className="flex-1 bg-gradient-to-b from-sky-200 to-yellow-100 grid items-center">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <CitySearch />
                        </div>
                        
                    </div>
                </div>


            </div>
        </MainLayout>
    )
}
