import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { SSHActionFlowListComponent } from "./components/ssh/SSHActionFlowListComponent";
import { SSHCreate } from "./components/ssh/SSHCreate";
import { ListSSH } from "./components/ssh/SSHList";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { routeUris, setRoute } from "./store/global/isLockSlice";

import { SSHActionComponent } from "./components/ssh/sshActions/SSHAction";
import { SSHOutput } from "./components/ssh/SSHOutput";
import { SSHDeleteList } from "./components/ssh/SSHDeleteList";

import { Shell } from "./components/shell/Shell";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterRoute />,
  },
  {
    path: "/login",
    element: <LoginRoute></LoginRoute>,
  },
  {
    path: "/dashboard",
    element: <DashboardRoute></DashboardRoute>
  }
]);



export const MyRouter = (props: {
  url: routeUris
}) => {
  console.log(props.url);

  useEffect(() => {

  }, [props.url])

  switch (props.url) {
    case (routeUris.register):
      window.history.pushState(routeUris.register, routeUris.register, routeUris.register)
      window.history.replaceState(routeUris.register, routeUris.register, routeUris.register)
      return RegisterRoute()
      break
    case (routeUris.login):
      window.history.pushState(routeUris.login, routeUris.login, routeUris.login)
      window.history.replaceState(routeUris.login, routeUris.login, routeUris.login)
      return LoginRoute()
      break
    case (routeUris.action):
      window.history.pushState(routeUris.action, routeUris.action, routeUris.action)
      window.history.replaceState(routeUris.action, routeUris.action, routeUris.action)
      return DashboardRoute()
      break
    case (routeUris.sshCreate):
      window.history.pushState(routeUris.sshCreate, routeUris.sshCreate, routeUris.sshCreate)
      window.history.replaceState(routeUris.sshCreate, routeUris.sshCreate, routeUris.sshCreate)
      return CreateSSHRoute()
    case (routeUris.shell):
      window.history.pushState(routeUris.shell, routeUris.shell, routeUris.shell)
      window.history.replaceState(routeUris.shell, routeUris.shell, routeUris.shell)
      return ShellRoute()
    default:
      window.history.pushState(routeUris.sshCreate, routeUris.sshCreate, routeUris.sshCreate)
      window.history.replaceState(routeUris.sshCreate, routeUris.sshCreate, routeUris.sshCreate)
      return CreateSSHRoute()
  }

  return (
    RegisterRoute()
  )
}

function RegisterRoute() {
  const dispatch = useDispatch()
  dispatch(setRoute(routeUris.register))
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-2/3">
        <div className="h-min w-3/5">
          <Register />
        </div>
      </div>
    </div>
  )
}

function LoginRoute() {
  const dispatch = useDispatch()
  dispatch(setRoute(routeUris.login))
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-2/3">
        <div className="h-min w-3/5">
          <Login />
        </div>
      </div>
    </div>
  )
}

function DashboardRoute() {
  const dispatch = useDispatch()
  dispatch(setRoute(routeUris.action))
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="m-3"><ListSSH></ListSSH>                                        </div>
        <div className="m-3"><SSHActionComponent ></SSHActionComponent>                 </div>
        <div className="m-3"><SSHOutput></SSHOutput>                                    </div>
        <div className="m-3"><SSHActionFlowListComponent></SSHActionFlowListComponent>  </div>
      </div>
    </div>
  )
}


function CreateSSHRoute() {
  const dispatch = useDispatch()
  dispatch(setRoute(routeUris.sshCreate))
  return (
    <div>
      <div className="m-3"><SSHCreate></SSHCreate>                                    </div>
      <div className="m-3"><ListSSH></ListSSH>                                        </div>
      <div className="m-3"><SSHDeleteList></SSHDeleteList>                            </div>
    </div>
  )
}

function ShellRoute() {
    const dispatch = useDispatch()
    dispatch(setRoute(routeUris.shell))
    return (
      <div>
        <Shell></Shell>
      </div>
    )
}