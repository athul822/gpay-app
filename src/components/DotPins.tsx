import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const DotPins = () => {
    const pin = useSelector(state => state.key.pin)
    return (
        <PinContainer>
            {
                pin.map((key, index) => <Dot key={index} pressed={key ? true : false} />)        
            }
        </PinContainer>
    )
}

export default DotPins


const PinContainer = styled.View`
   margin-top: ${moderateScale(10)};
   flex-direction: row;
   gap: ${moderateScale(20)}
`;
const Dot = styled.View`
    width: ${scale(23)};
    height: ${scale(23)};
    background-color:${(props: { pressed: boolean }) => props.pressed ? 'black' : 'white'};
    border-radius: 50px;
    borderWidth: 2px;
    borderColor: black;
`;