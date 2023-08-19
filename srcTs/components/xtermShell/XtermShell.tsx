import React, { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Terminal } from "xterm"
import { getSocket } from "./XtermContainer"

import { selectXtermShell } from "../../store/shell/xtermShell"

import "xterm/css/xterm.css"



interface socketMsg {
    msg: string
    id: string
}


export function XtermShell(props: {
    uuid: string
}) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const socket = getSocket()
    const term = new Terminal();

    const [val, setVal] = useState<number>(0)


    let closeCount = 0
    let openCount = 0

    let isOpen = false


    const select = useSelector(selectXtermShell.getSessions)


    let output = ""

    term.onData((data) => {
        const sendData = JSON.stringify({
            id: props.uuid,
            msg: data
        } as socketMsg)
        console.log("xterm", sendData);

        socket.send(sendData) 
    })


    useEffect(() => {
        output = select.find(ele => ele.UUID === props.uuid)!.output
        term.write(output)
    }, [select, props.uuid])



    useEffect(() => {
        console.log("term ref", terminalRef.current);
        console.log("isopen", isOpen)
        console.log("count open", openCount);
        console.log("close count", closeCount);

        
        
        if (openCount === 1 && output.length > 3) {
            const sendData = JSON.stringify({
                id: props.uuid,
                msg: "\u001b[A"
            } as socketMsg)
            console.log("xterm", sendData);
            socket.send(sendData)
    
        }


        if (terminalRef.current != undefined && !isOpen) {
            console.log("try to open term");
            openCount++
            term.open(terminalRef.current)
            term.focus()

            console.log("term", term);
            console.log("term", term.element);


            term.resize(70, 60)


            const handleResize = () => {
                const { cols, rows } = term;
                // socket.send(JSON.stringify({ 'resize': { cols, rows } }))
                console.log("size", cols, rows);
                
            };
            term.onResize(handleResize);

            isOpen = true
            return () => {
                term.dispose();
                closeCount++
            };

        }
    }, [props.uuid, select, output]); // [select]

    return <>
        <div className="h-96 w-full" ref={terminalRef} />;
    </>
};

