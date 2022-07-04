import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthRoute from './components/authRoute'
import PrivateRoute from './components/privateRoute'
import 'antd/dist/antd.css'
import Login from './pages/login'
import ModalApp from './components/modal'
import SignUp from './pages/signup'
import Home from './pages/home'
import News from './pages/news'
import { useTranslation } from 'react-i18next'
import i18n from './translation/i18n'

import Navbar from './components/Navbar'

function App() {
  const { t } = useTranslation()

  const changeL = () => {
    i18n.changeLanguage('en')
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/news" element={<News />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignUp />} exact />
      </Routes>

      {/* <Routes>
        <Route exact path='/' element={
          <PrivateRoute>
            {t('content.functional')}
            <button onClick={()=>changeL()} >changeL</button>
            <Home />
          </PrivateRoute>
        } />
        <Route exact path='/news' element={
          // <PrivateRoute>
            <News/>
          // </PrivateRoute>
        } />
        <Route exact path='/login' element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route exact path='/signup' element={
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        } />
      </Routes> */}
    </BrowserRouter>
  )
}

export default App
