import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import Switch from './Components/Switch/Switch';
import Nav from './Components/Nav/Nav';
import TranslatePage from './pages/TranslatePage/TranslatePage';
import Saved from './pages/Saved/Saved';
import History from './pages/History/History';

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className='container header__container'>
          <Switch />
          <Nav />
        </div>
      </header>
      <Routes>
        <Route path = '/' element = {<TranslatePage />} />
        <Route path = '/saved' element = {<Saved />} />
        <Route path = '/history' element = {<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
