import gravatarUrl from "gravatar-url";
import * as React from "react";
import { GoLinkExternal } from "react-icons/go";
import members from "./data/members.json";

const style: { [key: string]: React.CSSProperties } = {
    icon: {
        display: "inline-block",
        verticalAlign: "middle",
    },
};

type SCHEMA = {
    list: boolean;
    icon: string;
    name: string;
    name_en: string;
    url: string;
    login: string;
    affiliation: string;
    affiliation_en: string;
    grade: string;
    grade_en: string;
};

const gravatar = (login: string) => {
    if (!login) {
        return "";
    }
    return gravatarUrl(login + "@sfc.wide.ad.jp", { default: "404" });
};

const badgeColors: { [key: string]: string } = {
    blue: "bg-[#bee3f8] text-[#2a4365] dark:bg-[rgba(144,205,244,0.16)] dark:text-[#90cdf4]",
    teal: "bg-[#B2F5EA] text-[#234E52] dark:bg-[rgba(129,230,217,0.16)] dark:text-[#81E6D9]",
    purple: "bg-[#E9D8FD] text-[#44337A] dark:bg-[rgba(214,188,250,0.16)] dark:text-[#D6BCFA]",
    pink: "bg-[#FED7E2] text-[#702459] dark:bg-[rgba(251,182,206,0.16)] dark:text-[#FBB6CE]",
    orange: "bg-[#FEEBC8] text-[#7B341E] dark:bg-[rgba(251,211,141,0.16)] dark:text-[#FBD38D]",
    yellow: "bg-[#FEFCBF] text-[#744210] dark:bg-[rgba(250,240,137,0.16)] dark:text-[#FAF089]",
    cyan: "bg-[#C4F1F9] text-[#086F83] dark:bg-[rgba(157,236,249,0.16)] dark:text-[#9DECF9]",
    gray: "bg-[#EDF2F7] text-[#1A202C] dark:bg-[rgba(226,232,240,0.16)] dark:text-[#E2E8F0]",
};

const badge = (badgeStr: string) => {
    switch (badgeStr) {
        case "EI":
            return "blue";
        case "PM":
            return "teal";
        case "MAG":
            return "purple";
        case "B1":
        case "B2":
        case "B3":
        case "B4":
            return "pink";
        case "M1":
        case "M2":
            return "orange";
        case "D1":
        case "D2":
        case "D3":
            return "yellow";
        case "Professor":
            return "cyan";
        default:
            return "gray";
    }
};

const randomColorFromString = (str: string) => {
    let hash = 0;
    if (str.length === 0) {
        return hash.toString();
    }
    for (let i = 0; i < str.length; i += 1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    let color = "#";
    for (let j = 0; j < 3; j += 1) {
        const value = (hash >> (j * 8)) & 255;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
};

const isDark = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};

const initials = (name: string) => {
    const names = name.trim().split(" ");
    const firstName = names[0] ?? "";
    const lastName = names.length > 1 ? names[names.length - 1] : "";
    return firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`
        : firstName.charAt(0);
};

const useImage = (src: string) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "failed">(
        src ? "loading" : "failed",
    );
    React.useEffect(() => {
        if (!src) {
            setStatus("failed");
            return;
        }
        setStatus("loading");
        let active = true;
        const image = new Image();
        image.onload = () => active && setStatus("loaded");
        image.onerror = () => active && setStatus("failed");
        image.src = src;
        return () => {
            active = false;
        };
    }, [src]);
    return status;
};

const Avatar = (props: { name: string; src: string }) => {
    const status = useImage(props.src);
    const bg = randomColorFromString(props.name);
    const textColor = isDark(bg) ? "text-white" : "text-[#1A202C]";
    const showFallback = status !== "loaded";
    return (
        <span
            className={`relative me-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[9999px] border-white text-center align-middle text-[0.6rem] font-medium uppercase dark:border-[#1A202C] ${textColor}`}
            style={showFallback ? { backgroundColor: bg } : undefined}
        >
            {showFallback ? (
                <div role="img" aria-label={props.name} className="leading-none">
                    {initials(props.name)}
                </div>
            ) : (
                <img
                    src={props.src}
                    alt={props.name}
                    className="h-full w-full rounded-[9999px] object-cover"
                />
            )}
        </span>
    );
};

export const Members = (props: { en: boolean }) => {
    const facultiesList: React.JSX.Element[] = [];
    const studentsList: React.JSX.Element[] = [];
    let key = 0;
    Array.prototype.forEach.call(members.faculties, (element) => {
        if (element.list) {
            facultiesList.push(<Member key={key} data={element} en={props.en}></Member>);
        }
        key++;
    });
    Array.prototype.forEach.call(members.students, (element) => {
        if (element.list) {
            studentsList.push(<Member key={key} data={element} en={props.en}></Member>);
        }
        key++;
    });
    return (
        <div>
            <div className="my-4">
                <h3 className="mb-2 text-[1.875rem] font-bold">{props.en ? "Faculty" : "教員"}</h3>
                <ul className="ms-[1em] list-disc">{facultiesList}</ul>
            </div>
            <div className="my-4">
                <h3 className="mb-2 text-[1.875rem] font-bold">{props.en ? "Students" : "学生"}</h3>
                <ul className="ms-[1em] list-disc">{studentsList}</ul>
            </div>
        </div>
    );
};

const badgesBase =
    "inline-block whitespace-nowrap align-middle rounded-xs px-1 text-[0.75rem] font-bold uppercase";
const codeClasses =
    "inline-block rounded-xs bg-[#EDF2F7] px-[0.2em] font-mono text-[0.875rem] text-[#1A202C] dark:bg-[rgba(226,232,240,0.16)] dark:text-[#E2E8F0]";

const Member = (props: { data: SCHEMA; en: boolean }) => (
    <li className="my-2">
        <Avatar
            name={props.en ? props.data.name_en : props.data.name}
            src={props.data.icon ? props.data.icon : gravatar(props.data.login)}
        />
        {props.data.url === "" ? (
            <p className="inline-block">
                {props.en ? props.data.name_en : props.data.name} (
                <code className={codeClasses}>{props.data.login}</code>)
            </p>
        ) : (
            <>
                <a
                    className="mr-1 cursor-pointer text-[#319795] no-underline [outline:2px_solid_transparent] outline-offset-2 transition-colors hover:underline focus-visible:shadow-[0_0_0_3px_rgba(66,153,225,0.6)]"
                    href={props.data.url}
                >
                    {props.en ? props.data.name_en : props.data.name} (
                    <code className={codeClasses}>{props.data.login}</code>)
                </a>
                <GoLinkExternal style={style.icon} />
            </>
        )}
        <span className={`${badgesBase} mx-1 ${badgeColors[badge(props.data.affiliation_en)]}`}>
            {props.en ? props.data.affiliation_en : props.data.affiliation}
        </span>
        <span className={`${badgesBase} ${badgeColors[badge(props.data.grade_en)]}`}>
            {props.en ? props.data.grade_en : props.data.grade}
        </span>
    </li>
);
