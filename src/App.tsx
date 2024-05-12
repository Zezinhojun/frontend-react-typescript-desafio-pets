import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { AppContextProvider } from './components/Context/AppContextProvider'
import { FormComponent } from './components/Form/Form'
import { TableComponent } from './components/Table/TableComponent'


function App() {


  return (
    <>
      <AppContextProvider>
        <Container className="d-flex justify-content-center flex-column align-items-center" style={{ minHeight: '100vh' }}>
          <Row>
            <Col className='mb-5'>
              <TableComponent />
            </Col>
          </Row>
          <FormComponent />
        </Container>


      </AppContextProvider>
    </>
  )
}

export default App
