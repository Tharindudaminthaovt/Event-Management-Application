import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Event from './pages/Event';
import TicketSelection from './components/TicketSelection';
import TicketConfimation from './components/TicketConfirmation';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import ContactDetails from './pages/ContactDetails';
import Admin from './pages/Admin';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/events' element={<Events />}/>
          <Route path='/search' element={<Search />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/contactus' element={<Contact />}/>
          <Route path='/event' element={<Event />}/>
          <Route path='/ticketselection' element={<TicketSelection />} />
          <Route path='/ticketconfirmation' element={<TicketConfimation />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/contactDetails' element={<ContactDetails/>} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
