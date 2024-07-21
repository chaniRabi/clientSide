import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../styles/themeStyle";

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "10px 0px 10px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 0px 30px 0px",
  overflow: "hidden",
  background: Colors.secondary,
}));

export const PromotionsContainer2 = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "10px 0px 10px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 0px 30px 0px",
  overflow: "hidden",
  // background: Colors.secondary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
     fontFamily: '"Montez", "cursive"',
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  color: 'Colors.Hex',
  fontSize: "1.5rem",
}));