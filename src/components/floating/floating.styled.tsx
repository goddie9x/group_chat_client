import { styled } from "@mui/material";

import TBox from "components/box";
import { TBoxProps } from "components/box/box.styled";

export type TFloatingProps = TBoxProps&{
    positionShowUp?: number;
};

const TFloatingStyled = styled(TBox)`
    position: fixed;
`;

export default TFloatingStyled;