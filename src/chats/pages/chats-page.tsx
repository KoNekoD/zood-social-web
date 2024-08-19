import {observer} from "mobx-react-lite";
import React from "react";
import {Outlet} from "react-router-dom";


export const ChatsPage = observer(() => {

    return (
        <div className="h-full bg-gray-200 px-4 py-2">
            <Outlet/>
        </div>
    );

});