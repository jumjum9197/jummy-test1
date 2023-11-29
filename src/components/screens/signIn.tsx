import { lazy, Suspense, useEffect } from "react";
import CircularLoader from "./circularLoader/circularLoader";
import DasboardLayout from "./dashboardLayout/dashboardLayout";



// const Main = lazy(() => import("../../components/signup/main"));
const Main = lazy(()=> import("../signIn/main"))

const SignIn = () => {
    // return (
    //     <DasboardLayout heading="Application Status">
    //         <Suspense fallback={<CircularLoader/>}>
    //             <Main/>
    //         </Suspense>
    //     </DasboardLayout>
    // )


    return (
            <Suspense 
            // fallback={<CircularLoader />}
            >
                <Main />
            </Suspense>
    )
}
export default SignIn;