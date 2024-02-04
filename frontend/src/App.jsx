import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Signup } from './Signup';
import { Signin } from './Signin';
import { AppBar } from './components/AppBar';
import { BalanceComp } from './components/BalanceComp';
import { Users } from './Users';

function App() {

  return (
    <div>
        {/* <BrowserRouter>
          <Routes>
            <Route path= "/signup" element={<Signup />} />
            <Route path= "/signin" element={<Signin />} />
            <Route path= "/dashboard" element={<Dashboard />} />
            <Route path= "/send" element={<SendMoney />} />
          </Routes>
        </BrowserRouter> */}
      <AppBar />
      <BalanceComp balance={"10,000"} />
      <Users />
    </div>
  )
}



export default App
