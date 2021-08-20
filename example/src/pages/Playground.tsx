import React from "react";
import {WorkFlowPalette, Toolbar} from "./index"


export default function Playground(props) {
    return <div style={{display: "flex", width: "100vw", height: "100vh"}}>
        <div style={{width: "calc(100vw - 200px)", height: "100vh", overflow: "auto"}}>
        <WorkFlowPalette></WorkFlowPalette>
        </div>
        <div style={{width: "200px", height: "100vh"}}>
        <Toolbar />
        </div>
    </div>
};
