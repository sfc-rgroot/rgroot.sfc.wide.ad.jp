import * as React from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = {
    textColor?: string;
};

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
    const { setTheme, resolvedTheme } = useTheme();
    const SwitchIcon = resolvedTheme === "light" ? FaMoon : FaSun;
    const text = resolvedTheme === "light" ? "dark" : "light";

    return (
        <button
            type="button"
            className={`${props.textColor ?? ""} relative ml-2 inline-flex h-10 min-w-10 cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-md align-middle text-lg font-semibold leading-[1.2] [outline:2px_solid_transparent] outline-offset-2 transition-colors hover:bg-[#EDF2F7] active:bg-[#E2E8F0] dark:hover:bg-[rgba(255,255,255,0.08)] dark:active:bg-[rgba(255,255,255,0.16)]`}
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${text} mode`}
        >
            <SwitchIcon />
        </button>
    );
};
