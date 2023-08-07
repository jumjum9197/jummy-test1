import { lazy, Suspense, useEffect } from "react";
// import CircularLoader from "../custom/circularLoader/circularLoader";

// const Main = lazy(() => import("../../components/signup/main"));
const Main = lazy(()=> import("../signIn/main"))

const SignIn = () => {
    return (
            <Suspense 
            // fallback={<CircularLoader />}
            >
                <Main />
            </Suspense>
    )
}
export default SignIn;