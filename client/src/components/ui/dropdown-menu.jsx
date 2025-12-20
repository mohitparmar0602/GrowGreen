import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';;

const DropdownContext = createContext({
    open: false,
    setOpen: () => { },
});

const DropdownMenu = ({ children }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div ref={dropdownRef} className="relative inline-block text-left">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

const DropdownMenuTrigger = ({ children, asChild, className, ...props }) => {
    const { open, setOpen } = useContext(DropdownContext);

    // Convert to button if not already one, or just wrap
    return (
        <div
            onClick={() => setOpen(!open)}
            className={cn("cursor-pointer", className)}
            {...props}
        >
            {children}
        </div>
    );
};

const DropdownMenuContent = ({ children, className, align = "end", ...props }) => {
    const { open } = useContext(DropdownContext);

    if (!open) return null;

    return (
        <div
            className={cn(
                "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                align === "end" ? "right-0" : "left-0",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const DropdownMenuItem = ({ children, className, onClick, ...props }) => {
    const { setOpen } = useContext(DropdownContext);

    const handleClick = (e) => {
        if (onClick) onClick(e);
        setOpen(false);
    };

    return (
        <div
            onClick={handleClick}
            className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const DropdownMenuLabel = ({ children, className, ...props }) => {
    return (
        <div
            className={cn("px-2 py-1.5 text-sm font-semibold", className)}
            {...props}
        >
            {children}
        </div>
    );
};

const DropdownMenuSeparator = ({ className, ...props }) => {
    return (
        <div
            className={cn("-mx-1 my-1 h-px bg-slate-100", className)}
            {...props}
        />
    );
};

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
};
