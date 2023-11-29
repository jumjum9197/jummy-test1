import {Route, BrowserRouter,Routes} from 'react-router-dom'
import './App.css';
import SignUp from './components/screens/signUp';
import SignIn from './components/screens/signIn';
import Profile from './components/screens/profile/profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/profile' element={<Profile/>}/>

 
      </Routes>
    </BrowserRouter>
 
  );
}


export default App;
