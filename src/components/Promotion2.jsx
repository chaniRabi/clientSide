import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { PromotionsContainer, PromotionsContainer2 } from "../styles/promotiom";

const messages = [
    "/IMG/בחנות/shop.jpg",
    "/IMG/בחנות/בחנות.jpeg",
    "/IMG/בחנות/shopA.jpeg",
    "/IMG/בחנות/shopB.jpeg",
    "/IMG/בחנות/shopC.jpeg",
    "/IMG/בחנות/shopD.jpeg",
    "/IMG/בחנות/shopF.jpeg",
];

export default function Promotions2() {
    const containerRef = useRef();
    const [show, setShow] = useState(true);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);

        const intervalId = setInterval(() => {
            // get next message
            setMessageIndex((i) => (i + 1) % messages.length);

            // slide the message in
            setShow(true);

            setTimeout(() => {
                setShow(false);
            }, 3000);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <PromotionsContainer2 ref={containerRef} overflow="hidden">
            <Slide
                direction={show ? "left" : "right"}
                in={show}
                container={containerRef.current}
                timeout={{
                    enter: 500,
                    exit: 200,
                }}
            >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img src={messages[messageIndex]} alt={`Promotion ${messageIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </Box>
            </Slide>
        </PromotionsContainer2>
    );
}