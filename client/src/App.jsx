import { useState } from 'react'
import { HashRouter } from 'react-router-dom';
import { Navbar, Welcome, Footer, Services, Transactions } from './components'

const App = () => {

  return (
    <HashRouter>

    <div className = 'min-h-screen' >
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome />

      </div>
      
      <Services />
      <Transactions />
      <Footer />
      
    </div>
    </HashRouter>
        
  )
}

export default App
