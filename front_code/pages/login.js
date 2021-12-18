import Login from "../Components/Forms/Login"
import Register from "../Components/Forms/Register"

export default () => {
    return (
        <div className="h-screen bg-yellow-100 grid items-center bg-gradient-to-b from-white to-sky-200">
            <div className="container mx-auto">
                <div className="text-center border border-sky-200 flex shadow-md shadow-sky-300/40 rounded-lg bg-white">
                    <div className="flex-1 p-2">
                       <Login /> 
                    </div>
                    <div className="flex-1 p-2">
                        <Register />
                    </div>
                </div>
            </div>
        </div>
    )
}