import {useState} from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthRoute from './components/authRoute'
import PrivateRoute from './components/privateRoute'
import 'antd/dist/antd.css'
import Login from './pages/login'
import SignUp from './pages/signup'
import Home from './pages/home'
import News from './pages/news'
import { useTranslation } from 'react-i18next'
import i18n from './translation/i18n'

import Navbar from './components/Navbar'
import DetailCountry from './pages/detailCountry'
import ThemeStatus from './util/themeStatus'

function App() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState('dark')

  const changeL = () => {
    i18n.changeLanguage('en')
  }
  return (
    <div className={ThemeStatus()}>
    <BrowserRouter>
      <Navbar theme={setTheme} />
      {/* <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/news" element={<News />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignUp />} exact />
      </Routes> */}

      <Routes>
        <Route exact path='/' element={
          <PrivateRoute>
            <Home theme={theme}/>
          </PrivateRoute>
        } />
        <Route exact path='/news' element={
          // <PrivateRoute>
            <News theme={theme}/>
          // </PrivateRoute>
        } />
        <Route exact path='/login' element={
          <AuthRoute>
            <Login theme={theme}/>
          </AuthRoute>
        } />
        <Route exact path='/signup' element={
          <AuthRoute>
            <SignUp theme={theme}/>
          </AuthRoute>
        } />
        <Route exact path='/country/:iso2' element={
          <PrivateRoute>
            <DetailCountry theme={theme}/>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
