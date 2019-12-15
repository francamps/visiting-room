import React from "react";
import { useSpring, animated } from "react-spring";

const TimelineModal = ({ content, setModal }) => {
    const fadeInProps = useSpring({
        config: { duration: 400 },
        to: { opacity: 1 },
        from: {
            opacity: 0
        }
    });

    return (
        <animated.div
            className=""
            style={{
                ...fadeInProps,
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                display: "flex",
                backdropFilter: "blur(10px)",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "10px 5px 5px white"
            }}
            onClick={() => {
                setModal(false);
            }}
        >
            <div
                className="modal"
                style={{
                    width: "600px",
                    height: "auto",
                    padding: "20px",
                    borderLeft: "1px solid var(--clr-light-grey)",
                    borderTop: "1px solid var(--clr-light-grey)",
                    background: "black",

                    fontFamily: "GTEesti",
                    fontSize: "var(--font-normal)"
                }}
            >
                <p>{content}</p>
            </div>
        </animated.div>
    );
};

export default TimelineModal;
