import React, { Dispatch, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Terminal } from "xterm"
import {getSocket} from "./XtermContainer"



export function XtermShell() {
        const terminalRef = useRef<HTMLDivElement>(null);
        const dispatch = useDispatch()
        const socket = getSocket()
        const term = new Terminal();
        term.focus()
    
    
        // const select = useSelector(get.msg)
    
        term.onData((data)=> {
            console.log(data);
            
            socket.send(data)
        })
    
    
        useEffect(() => {
            if (terminalRef.current != undefined) {
    
                console.log("term", term);
                console.log("term", term.element);
    
    
                term.resize(40, 30)
                // const attachAddon = new AttachAddon(socket);
                // term.loadAddon(attachAddon);
                term.open(terminalRef.current)
    
                // term.write(select)
                term.focus()
    
                const handleResize = () => {
                    const { cols, rows } = term;
                    socket.send(JSON.stringify({ 'resize': { cols, rows } }))
                };
                term.onResize(handleResize);
    
                return () => {
                    term.dispose();
                };
            }
        }, []); // [select]
    
        return <div ref={terminalRef} />;
    };
    
