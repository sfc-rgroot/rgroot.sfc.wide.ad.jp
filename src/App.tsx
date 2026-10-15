import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { TypeAnimation } from "react-type-animation";
import { BiNetworkChart } from "react-icons/bi";
import { AiOutlineCloudServer, AiOutlineMail } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";
import { GoLinkExternal } from "react-icons/go";
import { HiTranslate } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import { useTranslation } from "react-i18next";
import { Members } from "./Members";
import { Publications } from "./Publications";
import { langList } from "./data/i18n/i18n";
import i18n from "i18next";
import { Fade, ScaleFade } from "./components/Transitions";
import { AnimatePresence, motion, type Variants } from "motion/react";
import "@fontsource/biz-udpgothic";
import "@fontsource/ibm-plex-mono";
import { Provider } from "./provider";

const style: { [key: string]: React.CSSProperties } = {
    image: {
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
        objectFit: "cover",
        height: "100vh",
        width: "100vw",
    },
    icon: {
        display: "inline-block",
        verticalAlign: "middle",
    },
};

const buttonClasses =
    "relative inline-flex h-10 min-w-10 cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-md align-middle font-semibold leading-[1.2] [outline:2px_solid_transparent] outline-offset-2 transition-colors hover:bg-[#EDF2F7] active:bg-[#E2E8F0] dark:hover:bg-[rgba(255,255,255,0.08)] dark:active:bg-[rgba(255,255,255,0.16)]";

const linkClasses =
    "cursor-pointer text-[#319795] no-underline [outline:2px_solid_transparent] outline-offset-2 transition-colors hover:underline focus-visible:shadow-[0_0_0_3px_rgba(66,153,225,0.6)]";

const menuVariants: Variants = {
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
    enter: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
};

export const App = () => {
    const [en, setEn] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const [fontLoad, setFontLoad] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [tipOpen, setTipOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
        setEn(lang === "ja" ? false : true);
        setMenuOpen(false);
    };

    const langElems = langList.map((e) => {
        return (
            <li key={e.key}>
                <button
                    type="button"
                    className="flex w-full flex-[0_0_auto] cursor-pointer select-none items-center px-3 py-1.5 text-start text-inherit no-underline [outline:2px_solid_transparent] outline-offset-2 transition-colors duration-75 hover:bg-[#EDF2F7] focus:bg-[#EDF2F7] dark:hover:bg-[rgba(255,255,255,0.06)] dark:focus:bg-[rgba(255,255,255,0.06)]"
                    onClick={() => changeLang(e.key)}
                >
                    {e.value}
                </button>
            </li>
        );
    });

    const { t } = useTranslation();

    React.useEffect(() => {
        if (document.readyState === "complete") {
            //already loaded
            setLoad(true);
        }
        window.addEventListener("load", () => setLoad(true));
        document.fonts.ready.then(() => setFontLoad(true));
    }, []);

    React.useEffect(() => {
        if (!menuOpen) {
            return;
        }
        const onClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [menuOpen]);

    return (
        <Provider>
            <div className={`overflow-x-hidden ${load && fontLoad ? "relative" : "fixed"}`}>
                <Fade in={!(load && fontLoad)} unmountOnExit={true}>
                    <div className="fixed flex min-h-screen min-w-screen items-center justify-center bg-white">
                        <div className="mr-10 inline-block h-12 w-12 animate-spin rounded-full border-2 border-solid border-[rgba(0,0,0,0.8)] border-b-transparent border-l-transparent [animation-duration:0.45s]" />
                        <div className="font-[sans-serif] text-[3rem] leading-12.5 text-[#C9E9FA]">
                            {"> SFC-"}
                            <h1 className="inline-block text-[3rem] font-bold text-[#0369A1]">
                                {"RG"}
                            </h1>
                        </div>
                    </div>
                </Fade>
                <ScaleFade in={load && fontLoad}>
                    <div className="text-left">
                        <img src="/og-image.webp" className="absolute z-[-1]" style={style.image} />
                        <div className="grid min-h-[95vh] p-3">
                            <div className="justify-self-end">
                                <ColorModeSwitcher textColor="text-[rgba(255,255,255,0.8)]" />
                                <div
                                    ref={menuRef}
                                    className="relative inline-block h-10 align-middle"
                                    onMouseEnter={() => setTipOpen(true)}
                                    onMouseLeave={() => setTipOpen(false)}
                                >
                                    <button
                                        type="button"
                                        aria-label="language"
                                        className={`${buttonClasses} text-[rgba(255,255,255,0.8)]`}
                                        onClick={() => setMenuOpen((o) => !o)}
                                    >
                                        <HiTranslate />
                                    </button>
                                    {tipOpen && (
                                        <span
                                            role="tooltip"
                                            className="pointer-events-none absolute left-1/2 top-full z-1800 mt-2 max-w-xs -translate-x-1/2 whitespace-nowrap rounded-xs bg-[#2D3748] px-2 py-0.5 text-[0.875rem] font-medium text-[rgba(255,255,255,0.92)] shadow-md dark:bg-[#CBD5E0] dark:text-[#171923]"
                                        >
                                            {t("tooltip.langSwitcher")}
                                        </span>
                                    )}
                                    <AnimatePresence>
                                        {menuOpen && (
                                            <motion.ul
                                                className="absolute right-0 top-full z-1000 mt-2 min-w-56 origin-center rounded-md border border-[#e2e8f0] bg-white py-2 [box-shadow:0_1px_2px_0_rgba(0,0,0,0.05)] [outline:0] dark:border-[rgba(255,255,255,0.16)] dark:bg-[#2D3748] dark:[box-shadow:rgba(0,0,0,0.1)_0px_0px_0px_1px,rgba(0,0,0,0.2)_0px_5px_10px,rgba(0,0,0,0.4)_0px_15px_40px]"
                                                initial="exit"
                                                animate="enter"
                                                exit="exit"
                                                variants={menuVariants}
                                            >
                                                {langElems}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col gap-2 text-[rgba(255,255,255,0.8)] min-[480px]:mt-0">
                                <div className="pl-[14vw] text-[2.25rem] leading-12.5 text-[#C9E9FA]">
                                    {"> SFC-"}
                                    <h1 className="inline-block text-[2.25rem] font-bold text-[#0369A1]">
                                        {"RG"}
                                    </h1>
                                </div>

                                <h1 className="pl-[14vw] pb-25 text-[4.5rem] font-bold leading-37.5 min-[480px]:pb-50 min-[768px]:text-[8rem]">
                                    rgroot
                                </h1>
                                <div className="mb-12.5 min-h-20">
                                    <div className="flex flex-col items-center gap-2 align-middle">
                                        <p className="inline min-h-24 overflow-hidden whitespace-nowrap text-center align-middle text-[1.875rem] leading-24 min-[768px]:text-[3.75rem]">
                                            <TypeAnimation
                                                sequence={["build", 3000, "operate", 3000]}
                                                cursor={true}
                                                repeat={Infinity}
                                                speed={60}
                                                wrapper="span"
                                            ></TypeAnimation>
                                            <span>our network.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-14 items-center justify-center">
                        <div className="h-full border-l opacity-60" />
                    </div>
                    <div className="mt-25">
                        <div className="relative mx-4 flex min-w-0 flex-col items-center wrap-break-word rounded-xl border-current bg-[#EDF2F7] p-2 dark:bg-[#2D3748] min-[768px]:mx-10 min-[768px]:p-10">
                            <div className="p-7">
                                <h2 className="text-center text-[2.25rem] font-bold min-[768px]:text-[3.75rem]">
                                    {t("heading.about")}
                                </h2>
                            </div>
                            <div className="flex-1 basis-[0%] p-7">
                                <p className="whitespace-pre-line text-center text-[1.25rem]">
                                    {t("text.about")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 px-4 min-[768px]:px-10">
                        <h2 className="pb-4 text-[2.25rem] font-bold">{t("heading.topics")}</h2>
                        <p className="whitespace-pre-line">{t("text.topics")}</p>
                        <IconContext.Provider value={{ size: "100px" }}>
                            <div className="mt-10 grid grid-cols-1 gap-10 min-[768px]:grid-cols-3">
                                <div className="relative flex min-w-0 flex-col items-center wrap-break-word rounded border border-[#e2e8f0] bg-white dark:border-[rgba(255,255,255,0.16)] dark:bg-[#1A202C]">
                                    <div className="p-3">
                                        <AiOutlineCloudServer />
                                    </div>
                                    <div className="flex-1 basis-[0%] p-3">
                                        <div className="flex flex-col items-center gap-2">
                                            <h3 className="text-center text-[0.875rem] font-bold">
                                                {t("heading.topicHighSpeed")}
                                            </h3>
                                            <p className="text-center">
                                                {t("text.topicHighSpeed")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex min-w-0 flex-col items-center wrap-break-word rounded border border-[#e2e8f0] bg-white dark:border-[rgba(255,255,255,0.16)] dark:bg-[#1A202C]">
                                    <div className="p-3">
                                        <BiNetworkChart />
                                    </div>
                                    <div className="flex-1 basis-[0%] p-3">
                                        <div className="flex flex-col items-center gap-2">
                                            <h3 className="text-center text-[0.875rem] font-bold">
                                                {t("heading.topicNextGeneration")}
                                            </h3>
                                            <p className="text-center">
                                                {t("text.topicNextGeneration")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex min-w-0 flex-col items-center wrap-break-word rounded border border-[#e2e8f0] bg-white dark:border-[rgba(255,255,255,0.16)] dark:bg-[#1A202C]">
                                    <div className="p-3">
                                        <GiNetworkBars />
                                    </div>
                                    <div className="flex-1 basis-[0%] p-3">
                                        <div className="flex flex-col items-center gap-2">
                                            <h3 className="text-center text-[0.875rem] font-bold">
                                                {t("heading.topicIoT")}
                                            </h3>
                                            <p className="text-center">{t("text.topicIoT")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="mt-20 px-4 min-[768px]:px-10">
                        <h2 className="pb-4 text-[2.25rem] font-bold">{t("heading.members")}</h2>
                        <p className="whitespace-pre-wrap">{t("text.members")}</p>
                        <Members en={en} />
                    </div>
                    <div className="mt-20 px-4 min-[768px]:px-10">
                        <h2 className="pb-4 text-[2.25rem] font-bold">
                            {t("heading.publications")}
                        </h2>
                        <p className="pb-4">{t("text.publications")}</p>
                        <Publications en={en} />
                    </div>
                    <div className="mt-20 px-4 min-[768px]:px-10">
                        <h2 className="pb-4 text-[2.25rem] font-bold">{t("heading.contact")}</h2>
                        <p>{t("text.contact")}</p>
                    </div>
                    <div className="mt-10 bg-[#2D3748] p-4 text-white min-[768px]:p-10">
                        <h2 className="mb-6 text-[20px] font-bold">{t("heading.links")}</h2>
                        <ul className="ms-[1em] list-disc">
                            <li>
                                <a
                                    className={`${linkClasses} mr-1`}
                                    href="https://www.sfc.keio.ac.jp/"
                                >
                                    {t("text.linkSFC")}
                                </a>
                                <GoLinkExternal style={style.icon} />
                            </li>
                            <li>
                                <a
                                    className={`${linkClasses} mr-1`}
                                    href="https://rg.sfc.keio.ac.jp/"
                                >
                                    {t("text.linkRG")}
                                </a>
                                <GoLinkExternal style={style.icon} />
                            </li>
                            <li>
                                <a
                                    className={`${linkClasses} mr-1`}
                                    href="https://www.sfc.wide.ad.jp/"
                                >
                                    {t("text.linkMuraiLab")}
                                </a>
                                <GoLinkExternal style={style.icon} />
                            </li>
                            <li>
                                <a className={`${linkClasses} mr-1`} href="https://www.wide.ad.jp/">
                                    {t("text.linkWIDE")}
                                </a>
                                <GoLinkExternal style={style.icon} />
                            </li>
                        </ul>
                        <div className="mt-10 flex flex-col items-center gap-2">
                            <p>©2026 SFC-RG / rgroot</p>
                            <div>
                                <AiOutlineMail style={style.icon}></AiOutlineMail>
                                <a
                                    className={`${linkClasses} ml-1`}
                                    href="mailto:rgroot@sfc.wide.ad.jp"
                                >
                                    rgroot@sfc.wide.ad.jp
                                </a>
                            </div>
                        </div>
                    </div>
                </ScaleFade>
            </div>
        </Provider>
    );
};
