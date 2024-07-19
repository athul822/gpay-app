import React, { useEffect, useState } from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { resetPin, setWrongPin } from '../store/key'

const LodingDots = () => {
    const dispatch = useDispatch()
    const [animate, setAnimate] = useState(true)
    const [dotCount, setDotCount] = useState(2)
    const Dot = styled.View`
    width: ${scale(15)};
    height: ${scale(15)};
    background-color:${(props: { ids: number }) => props.ids == dotCount ? 'black' : 'grey'};
    border-radius: 50px;
`;
    useEffect(() => {
        if (!animate) return
        const animation = setInterval(() => {
            setDotCount((prev) => prev === 3 ? 0 : prev + 1)
        }, 150)
        const endAnimation = setTimeout(() => {
            clearInterval(animation)
            dispatch(resetPin())
            dispatch(setWrongPin(true))
        }, 1500)
        return () => clearTimeout(endAnimation)

    }, [animate])
    return (
        <PinContainer>
            <Dot ids={0} />
            <Dot ids={1} />
            <Dot ids={2} />
            <Dot ids={3} />
        </PinContainer>
    )
}
export default LodingDots

const PinContainer = styled.View`
   margin-top: ${moderateScale(10)};
   flex-direction: row;
   gap: ${moderateScale(20)}
`;
