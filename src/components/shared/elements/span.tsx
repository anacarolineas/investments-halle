import styled from "styled-components";

const StyledSpan = styled.span<CustomSpanProps>`
    font-weight: ${props => props.bold || "normal"};
    color: ${props => props.color || "inherit"};
    margin-bottom: 2px;
`;

export default function CustomSpan(props: CustomSpanProps) {
    return <StyledSpan color={props.color} bold={props.bold}>
                {props.children}
            </StyledSpan>  
}

interface CustomSpanProps {
    bold?: string;
    color?: string;
    children: React.ReactNode;
}