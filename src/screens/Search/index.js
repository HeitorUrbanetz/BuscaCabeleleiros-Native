import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Container} from './styles';

const All = styled.View`
    flex: 1;
    background-color: #63C2D1;
    justify-content: center;
    align-items: center;
    
`;

const ALLT = styled.Text`
    color: #fff;
`;

export default () => {
    return (
        <All>
            <ALLT>Search</ALLT>
        </All>
    )
}