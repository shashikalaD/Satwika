import React, { useState } from 'react';
import './App.css';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './SASS/style.scss';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { LeftPanel } from './Components/LeftPanel';
import { MiddlePanel } from './Components/MiddlePanel';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Label } from '@blueprintjs/core';
import Axios from 'axios';
import { AppToaster } from './common/AppToaster';
import { Register_User } from "./Graphql/Mutation";
import { useMutation } from "@apollo/client";
import { Button} from "@blueprintjs/core";
import { Home } from './Components/Home';
import { Cart } from './Components/Cart';
function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  const [usernameReg,setUsernameReg] = useState("");
  const [passwordReg,setpasswordReg] = useState("");

  const [username,setUsername] = useState("");
  const [password,setpassword] = useState("");
  const firstname='';
  const [loginStatus,setLoginStatus] = useState("");
//   // const [checkSaveType, setCheckSaveType] = useState();
//   const [taskMutationRegister, settaskMutationResultRegister] = useMutation(Register_User, {
//       onCompleted: (res) => {
//           AppToaster.clear()
//               AppToaster.show({ intent: 'success', message: 'registerd successfully' });
//       }
//   });
//   const insertRecord = () => {
//     taskMutationRegister({ variables: { firstname: firstname, username: usernameReg, password: passwordReg } });
// }
// const loginRecord = () => {
//   taskMutationRegister({ variables: { firstname: firstname, username: username, password: password } });
// }
 const insertRecord = () => {
   Axios.post("http://localhost:4000/register", {
     username:usernameReg,
     password: passwordReg,
   }).then((response) => {console.log(response)})
 }

 const loginRecord = () => {
  Axios.post("http://localhost:4000/login", {
    username:username,
    password: password,
  }).then((response) => {setLoginStatus(response.data)})
}
  return (
    <>

      <ApolloProvider client={client}>
       
        <div className="row">
          <div className="regitsration">
            <h1>Registration</h1>
            <Label>Username</Label>
            <input type="text" onChange={(e)=>{setUsernameReg(e.target.value);}} />
            <Label>Password</Label>
            <input type="password" onChange={(e)=>{setpasswordReg(e.target.value);}} />
            <Button onClick={insertRecord}  className=" btn-sm btn-info"  >Register</Button>
          </div>
          <div className="Login">
            <h1>Login</h1>
            <Label>Username</Label>
            <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value);}}/>
            <Label>Password</Label>
            <input type="password" placeholder="password" onChange={(e)=>{setpassword(e.target.value);}} />
            <Button onClick={loginRecord}  className=" btn-sm btn-success">Login</Button>
          </div>
          <h1>Login status {loginStatus}</h1>
        </div>
        <Footer />
      </ApolloProvider>
      <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
      <Header />
      <div>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
      </div>
        <Switch>
          <Route path="/dashboard">
          <MiddlePanel /> 
          </Route>
          <Route path="/preferences">
          <LeftPanel />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    </>
  );

}

export default App;
