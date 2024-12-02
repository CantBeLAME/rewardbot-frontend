import { useAuth, useCanvasAuth } from "../hooks/auth/useAuth";
import { Sidebar, Content, Title } from "../components/Sidebar";

export default function Profile() {
    const {
        user: { email, createdAt },
        loading,
    } = useAuth();
    const {
        canvasUser: { image, firstname, lastname },
        loadingCanvas,
    } = useCanvasAuth();

    if (loading || loadingCanvas) {
        return <div>Loading...</div>;
    }

    return (
        <Sidebar>
            <Content>
                <img
                    className="h-24 w-24 rounded-full border-4 border-blue-500"
                    src={image ?? "https://via.placeholder.com/150"}
                    alt="User Avatar"
                />
                <Title>
                    {firstname} {lastname}
                </Title>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-800">
                            {email}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Joined:</span>
                        <span className="font-medium text-gray-800">
                            {createdAt}
                        </span>
                    </div>
                </div>
            </Content>
        </Sidebar>
    );
};
