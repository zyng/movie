import styled from 'styled-components';

export const CollectionIcon = styled.span`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${({ color }) => color};
    margin: 0 5px;
`;