import MainLayout from "../Components/Layouts/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <div className="h-screen bg-yellow-100 grid items-center">
                <div className="container mx-auto">
                    <div className="text-center">
                        Welcome page
                    </div>
                    
                </div>
            </div>
        </MainLayout>
    )
}
