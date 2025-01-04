import { Route, Routes } from "react-router-dom";
 import Navbar from "./component/Navbar";
import Log from "./component/Log";
import Slot from "./component/Slot";
import { EmailProvider } from './component/EmailContext';
import SignupPaje from "./component/SignupPaje";
import Homepaje from "./component/Homepaje";

function App() {
  return (
    <EmailProvider>
    <div className="app" >
    <Navbar/>
      <Routes>
        {/* Define a route for the homepage */}
        <Route path="/login" element={<Log/>} />
        <Route path="/" element={<Homepaje/>}/>
        <Route path="/seeslot" element={<Slot/>}/>
        <Route path="/signup" element={<SignupPaje/>}/>
         {/* You can add more routes here for other pages */}
      </Routes> 
    </div>
    </EmailProvider>
  );
}

export default App;
