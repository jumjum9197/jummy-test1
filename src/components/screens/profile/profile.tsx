import { lazy, Suspense } from "react";
import Fallback from "../circularLoader/circularLoader";
import DashboardLayout from "../dashboardLayout/dashboardLayout";
const Main = lazy(() => import('../../landingPage/landingPage'))

const Profile = () => {
    return (
        <DashboardLayout>
            <Suspense fallback={<Fallback />}>
                <Main />
            </Suspense>
        </DashboardLayout>
    )
}

export default Profile;