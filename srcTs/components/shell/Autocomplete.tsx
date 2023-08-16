import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ShellSession, selectShell } from "../../store/shell/shell";
import { TextField } from "../basic/Button";
import { isVisible } from "@testing-library/user-event/dist/utils";

export function Autocomplete(props: {
    histroy: string[] | undefined,
    dirsEntry: string[] | undefined, 
    onKeyDown: (ele: React.KeyboardEvent<HTMLInputElement>) => any
    inputRef: React.RefObject<HTMLInputElement>,
    isLooked: boolean
}) {
    const [inputValue, setInputValue] = useState("");
    const [isHistoryListVisible, setIsHistoryListVisible] = useState(false)
    const [isAutoListVisible, setIsAutoListVisible] = useState(false)
    
    const items = isAutoListVisible ? props.dirsEntry ?? [] : props.histroy ?? []
    const [selectedIndex, setSelectedIndex] = useState(items.length - 1);

    if (props.inputRef.current != undefined) {
        props.inputRef.current.value = inputValue
    }


    console.log(props.inputRef);


    useEffect(() => {
        setSelectedIndex(items.length - 1)
    }, [props.histroy, props.dirsEntry])


    useEffect(()=> {

    }, [props.inputRef.current])


    const handleKeyDown = (event: any) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
            if (!isAutoListVisible) {
                setIsHistoryListVisible(true)
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
        } else if (event.key === "Enter" && selectedIndex !== -1) {
            if (isAutoListVisible) {
                const tmp = props.inputRef.current?.value.split(" ") ?? []
                tmp.pop()
                const newInputVal = tmp.join(" ") + items[selectedIndex]
                console.log("newInputVal", newInputVal);
                
                setInputValue(newInputVal);
            }else {
                setInputValue(items[selectedIndex]);
            }
            setSelectedIndex(props.histroy != undefined ? props.histroy.length - 1 : 0);
            setIsHistoryListVisible(false)
            setIsAutoListVisible(false)
        } else if (event.key === "Escape") {
            setSelectedIndex(-1);
            setIsHistoryListVisible(false)
            setIsAutoListVisible(false)
            setSelectedIndex(props.histroy != undefined ? props.histroy.length - 1 : 0);
        } else if (event.key === "Tab") {
            setIsAutoListVisible(true)
            
        }
    };


    console.log(items);
    

    return (
        <div className="relative">
            <DropUpList items={items} onClick={setInputValue} selectedIndex={selectedIndex} isVisable={isHistoryListVisible || isAutoListVisible} ></DropUpList>
            <TextField isLock={false} onKeyDown={(ele) => {
                if (!isHistoryListVisible) {
                    props.onKeyDown(ele)
                }
                handleKeyDown(ele)
            }} inputRef={props.inputRef}></TextField>
        </div>
    );
};

export default Autocomplete;



function DropUpList(props: {
    items: string[],
    onClick: (item: string) => any,
    selectedIndex: number,
    isVisable: boolean,
}) {
    const selectedIndex = props.selectedIndex;
    const items = props.items.slice(0, selectedIndex + 1);

    const ulRef = useRef<HTMLUListElement>(null);
    let [ulHeight, setULHeight] = useState<number>(0);


    useEffect(() => {
        ulHeight = ulRef.current?.clientHeight || 0;
        setULHeight(ulHeight)
    }, [props.isVisable])

    useEffect(() => {
        ulHeight = ulRef.current?.clientHeight || 0;
        setULHeight(ulHeight)
    }, [items])

    return props.isVisable ? (
        <div className="absolute">
            <ul
                className={`absolute bg-white border opacity-90`}
                style={{ transform: `translateY(-${ulHeight}px)` }}
                ref={ulRef}
            >
                {items.map((ele, index) => (
                    <li
                        key={index}
                        className={`bottom-12 px-4 cursor-pointer ${index === selectedIndex ? "bg-blue-200" : ""
                            }`}
                    >
                        {ele ?? ""}
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div></div>
    );
}