import { TBoxProps } from "components/box/box.styled";
import React from "react";
import TStyledCard from "./card.styled";

const TCard = (props: TBoxProps) => {
    return <TStyledCard {...props}/>;
};

export default TCard;