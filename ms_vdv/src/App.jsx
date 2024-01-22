import Routing from "./Routing"
import { MyAuthProvider } from "./providers/AuthProvider"

const App = () => {
  return (
    <MyAuthProvider>
        <Routing />
    </MyAuthProvider>
  )
}

export default App