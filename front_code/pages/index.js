import CitySearch from "../Components/Forms/CitySearch";
import MainLayout from "../Components/Layouts/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <div className="h-screen bg-gradient-to-b from-sky-200 to-yellow-100 grid items-center">
                <div className="container mx-auto">
                    <div className="text-center">
                        <CitySearch />
                    </div>
                    
                </div>
            </div>
        </MainLayout>
    )
}
