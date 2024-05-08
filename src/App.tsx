import './App.css'
import { AppContextProvider } from './components/AppContextProvider'
import { FormComponent } from './components/Form/Form'

function App() {


  return (
    <>
      <AppContextProvider>
        <FormComponent />
      </AppContextProvider>
    </>
  )
}

export default App
