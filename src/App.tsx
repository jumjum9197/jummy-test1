import {Route, BrowserRouter,Routes} from 'react-router-dom'
import './App.css';
import SignUp from './components/screens/signUp';
import SignIn from './components/screens/signIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
 
      </Routes>
    </BrowserRouter>
 
  );
}


export default App;
