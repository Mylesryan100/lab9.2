//import { useState } from 'react'
import './App.css'
import ColorPicker from './components/ColorPicker';
import Toggler from './components/Toggler'
//import ContentSwitcher from './components/ContentSwitcher';



function App() {

  return (
    <div>
      <h1>Character Counter App</h1>

      <ColorPicker />

      <hr />

      <Toggler />
    </div>
  )
}

export default App;