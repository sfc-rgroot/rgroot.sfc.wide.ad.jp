import * as React from "react";
import publications from "./data/publications.json";
import members from "./data/members.json";
import { AiOutlineLink } from "react-icons/ai";
import { Collapse } from "./components/Collapse";

const style: { [key: string]: React.CSSProperties } = {
    icon: {
        display: "inline-block",
        verticalAlign: "sub",
        marginRight: "10px",
    },
};

const createRules = () => {
    let rules: string[] = [];
    // Aaa Bbb
    rules = rules.concat(members.faculties.map((e) => e.name));
    rules = rules.concat(members.faculties.map((e) => e.name_en));
    rules = rules.concat(members.students.map((e) => e.name));
    rules = rules.concat(members.students.map((e) => e.name_en));
    // AaaBbb
    rules = rules.concat(members.faculties.map((e) => e.name.replace(/\s+/g, "")));
    rules = rules.concat(members.faculties.map((e) => e.name_en.replace(/\s+/g, "")));
    rules = rules.concat(members.students.map((e) => e.name.replace(/\s+/g, "")));
    rules = rules.concat(members.students.map((e) => e.name_en.replace(/\s+/g, "")));
    // Aaa BBB
    rules = rules.concat(
        members.faculties.map((e) => {
            const splitted = e.name_en.split(" ");
            return splitted[0] + splitted[1].toUpperCase();
        }),
    );
    rules = rules.concat(
        members.students.map((e) => {
            const splitted = e.name_en.split(" ");
            return splitted[0] + splitted[1].toUpperCase();
        }),
    );
    return rules;
};

const escapeRegexp = (term: string) => term.replace(/[|\\{}()[\]^$+*?.-]/g, (char) => `\\${char}`);

const Highlight = (props: { query: string[]; children: string }) => {
    const terms = props.query
        .filter((text) => text.length !== 0)
        .map((text) => escapeRegexp(text.trim()));
    if (!terms.length) {
        return <>{props.children}</>;
    }
    const regex = new RegExp(`(${terms.join("|")})`, "ig");
    const chunks = props.children.split(regex).filter(Boolean);
    return (
        <>
            {chunks.map((chunk, index) => {
                regex.lastIndex = 0;
                return regex.test(chunk) ? (
                    <mark key={index} className="whitespace-nowrap bg-[#FEEBC8] px-0.5 py-0.5">
                        {chunk}
                    </mark>
                ) : (
                    <React.Fragment key={index}>{chunk}</React.Fragment>
                );
            })}
        </>
    );
};

const linkIcon = (url: string) => {
    if (url) {
        return (
            <a
                href={url}
                className="cursor-pointer no-underline [outline:2px_solid_transparent] outline-offset-2 transition-colors hover:underline focus-visible:shadow-[0_0_0_3px_rgba(66,153,225,0.6)]"
            >
                <AiOutlineLink style={style.icon}></AiOutlineLink>
            </a>
        );
    }
};

const AccordionItem = (props: { title: string; children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="border-t border-[#e2e8f0] [overflow-anchor:none] last:border-b dark:border-[rgba(255,255,255,0.16)]">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex w-full cursor-pointer items-center px-4 py-2 text-base [outline:2px_solid_transparent] outline-offset-2 transition duration-200 hover:bg-[rgba(0,0,0,0.04)] focus-visible:shadow-[0_0_0_3px_rgba(66,153,225,0.6)]"
            >
                <div className="flex-1 text-left">
                    <h3 className="text-[1.875rem] font-bold">{props.title}</h3>
                </div>
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={`inline-block h-[1em] w-[1em] shrink-0 align-middle text-[1.25em] leading-[1em] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
            </button>
            <Collapse in={open}>
                <div className="px-4 pb-4 pt-2">
                    <ul className="ms-[1em] list-disc">{props.children}</ul>
                </div>
            </Collapse>
        </div>
    );
};

export const Publications = (props: { en: boolean }) => {
    const papersList: React.JSX.Element[] = [];
    const presentationsList: React.JSX.Element[] = [];
    const activitiesList: React.JSX.Element[] = [];
    let key = 0;
    const rules: string[] = createRules();
    Array.prototype.forEach.call(publications.papers, (element) => {
        papersList.push(
            <li key={key}>
                {linkIcon(element.url)}
                <Highlight query={rules}>{props.en ? element.en : element.ja}</Highlight>
            </li>,
        );
        key++;
    });
    Array.prototype.forEach.call(publications.presentations, (element) => {
        presentationsList.push(
            <li key={key}>
                {linkIcon(element.url)}
                <Highlight query={rules}>{props.en ? element.en : element.ja}</Highlight>
            </li>,
        );
        key++;
    });
    Array.prototype.forEach.call(publications.activities, (element) => {
        activitiesList.push(
            <li key={key}>
                {linkIcon(element.url)}
                {props.en ? element.en : element.ja}
            </li>,
        );
        key++;
    });
    return (
        <div>
            <AccordionItem title={props.en ? "Publication(peer-reviewed)" : "論文(査読有り)"}>
                {papersList}
            </AccordionItem>
            <AccordionItem title={props.en ? "Public presentation" : "その他発表など"}>
                {presentationsList}
            </AccordionItem>
            <AccordionItem title={props.en ? "Activity" : "その他活動など"}>
                {activitiesList}
            </AccordionItem>
        </div>
    );
};
