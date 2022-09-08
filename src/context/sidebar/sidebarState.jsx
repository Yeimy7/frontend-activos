import { useReducer } from "react";
import {  EXTENDED } from "../../types";
import sidebarContext from "./sidebarContext";
import { sidebarReducer } from "./sidebarReducer";

const SidebarState = props => {
    const initialState = {
        extended: true
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(sidebarReducer, initialState)

    //Funciones

    const changeSidebarMode = () => {
        dispatch({
            type:EXTENDED
        })
    }

    return (
        <sidebarContext.Provider
            value={{
                extended: state.extended,
                changeSidebarMode
            }}
        >
            {props.children}
        </sidebarContext.Provider>
    )
}
export default SidebarState