import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

const fadeVariants = {
    exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
    enter: { opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
};

interface FadeProps {
    in: boolean;
    unmountOnExit?: boolean;
    children: React.ReactNode;
}

export const Fade = (props: FadeProps) => {
    const show = props.unmountOnExit ? props.in : true;
    const animate = props.in || props.unmountOnExit ? "enter" : "exit";
    return (
        <AnimatePresence>
            {show && (
                <motion.div initial="exit" animate={animate} exit="exit" variants={fadeVariants}>
                    {props.children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const scaleFadeVariants = {
    exit: {
        opacity: 0,
        scale: 0.95,
        transitionEnd: { scale: 0.95 },
        transition: { duration: 0.1, ease: EASE_IN },
    },
    enter: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } },
};

export const ScaleFade = (props: FadeProps) => {
    return (
        <motion.div
            initial="exit"
            animate={props.in ? "enter" : "exit"}
            variants={scaleFadeVariants}
        >
            {props.children}
        </motion.div>
    );
};
