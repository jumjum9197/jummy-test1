import { lazy, Suspense, useEffect } from "react";
// import CircularLoader from "../custom/circularLoader/circularLoader";

// const Main = lazy(() => import("../../components/signup/main"));
const Main = lazy(()=> import("../signUp/main"))

const SignUp = () => {
    return (
            <Suspense 
            // fallback={<CircularLoader />}
            >
                <Main />
            </Suspense>
    )
}
export default SignUp;