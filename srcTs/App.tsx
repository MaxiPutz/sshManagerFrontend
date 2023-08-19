import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux";
import { select } from "./store/userSlice/userSlice";
import { User } from "./API/entity/entity";
import { initState } from "./API/login/login";
import { RouterProvider, } from "react-router-dom";
import { routeUris, selectGlobal, setRoute, } from "./store/global/isLockSlice";
import { MyRouter, router } from "./Router";
import { userDelete } from "./API/user/user";


function App() {
  const dispatch = useDispatch()
  const selectRoute = useSelector(selectGlobal.getRoute)
  const selectUser = useSelector(select.getUser)

  const [isSettingsVisible, setIsSettingVisible] = useState<boolean>(false)

  useEffect(() => {
    try {
      const { user } = JSON.parse(document.cookie) as { user: User }
      console.log("form cookie", user);
      if (user != undefined && selectUser.Name === "") {
        initState(user, dispatch)
      }
    } catch {
    }
  }, [])

  const hanldeOptionVisible = () => {
    isSettingsVisible ? setIsSettingVisible(false) : setIsSettingVisible(true)
    console.log(isSettingsVisible);

  }

  const handleLogout = () => {
    document.cookie = JSON.stringify({
      user: undefined
    })
    location.reload()
  }

  const hanldeDeleteAccount = () =>{
    console.log("try to delete");
    
    userDelete(selectUser).then(ele => {
      console.log(ele);
      return ele.json()
    }).then(json => {
      console.log(json);
      alert("deleting success")
      location.reload()

    }).catch(()=> {
      alert("somthing went wrong contact the developer!")
    })

  } 

  return (
    <div className="App">
      <ul className="overflow-hidden bg-blue-500 m-0 p-0 list-none">
        <li className={"float-left p-5" + ((selectRoute === routeUris.register) ? " bg-black" : "")}>          <button onClick={() => dispatch(setRoute(routeUris.register))} className="text-white"  >         Register        </button></li>
        <li className={"float-left p-5" + ((selectRoute === routeUris.login) ? " bg-black" : "")}>     <button onClick={() => dispatch(setRoute(routeUris.login))} className="text-white" >     Login                </button></li>
        <li className={"float-left p-5" + ((selectRoute === routeUris.sshCreate) ? " bg-black" : "")}> <button onClick={() => dispatch(setRoute(routeUris.sshCreate))} className="text-white" > SSH Create/Delete                </button></li>
        <li className={"float-left p-5" + ((selectRoute === routeUris.action) ? " bg-black" : "")}> <button onClick={() => dispatch(setRoute(routeUris.action))} className="text-white" > Batch                 </button></li>
        {/* <li className={"float-left p-5" + ((selectRoute === routeUris.shell) ? " bg-black" : "")}> <button onClick={() => dispatch(setRoute(routeUris.shell))} className="text-white" > Shell                </button></li> */}
        <li className={"float-left p-5" + ((selectRoute === routeUris.xtermShell) ? " bg-black" : "")}> <button onClick={() => dispatch(setRoute(routeUris.xtermShell))} className="text-white" > Shell                </button></li>


        {selectUser.Name !== "" ? 
          (<li className="float-right p-3 text-white"> Logged in as: <span className="text-2xl m-3">
            {/* <button onClick={handleLogout} className="">logout</button>  */}
            <UserSettingButton user={selectUser} handleOption={hanldeOptionVisible}></UserSettingButton>
            <UserSettingActions isHidden={!isSettingsVisible} user={selectUser} handleSingOut={handleLogout} hanldeDeleteAccount={hanldeDeleteAccount} ></UserSettingActions>
          </span>
          </li>)
          :
          <></>
        }

      </ul>
      <div className="">
        {/* <RouterProvider router={router} ></RouterProvider> */}
        <MyRouter url={selectRoute}></MyRouter>
      </div>
    </div>

  );
}

export default App;


function UserSettingButton(props: {
  user: User,
  handleOption: (e: any) => void
}) {
  return (
    <span className="float-right" >
      <button onClick={props.handleOption} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {props.user.Name}
        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </span>
  )
}

function UserSettingActions(props: {
  user: User,
  isHidden: boolean,
  handleSingOut: () => void,
  hanldeDeleteAccount: () => void
}) {
  return (
    <div hidden={props.isHidden} className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
      <div className="py-1" role="none">
        <button onClick={props.handleSingOut} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" id="menu-item-3">Sign out</button>
        <button onClick={props.hanldeDeleteAccount} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" id="menu-item-3">Delete Account</button>
      </div>
    </div>
  )
}