import * as React from "react";
import { motion, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const variants: Variants = {
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            height: { duration: 0.2, ease: EASE },
            opacity: { duration: 0.3, ease: EASE },
        },
        transitionEnd: { display: "none" },
    },
    enter: {
        height: "auto",
        opacity: 1,
        transition: {
            height: { duration: 0.3, ease: EASE },
            opacity: { duration: 0.4, ease: EASE },
        },
    },
};

export const Collapse = (props: { in: boolean; children: React.ReactNode }) => (
    <motion.div
        initial={false}
        animate={props.in ? "enter" : "exit"}
        variants={variants}
        style={{ overflow: "hidden", display: "block" }}
    >
        {props.children}
    </motion.div>
);
