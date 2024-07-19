import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GooglLogo from '../components/GooglLogo'
import { moderateScale, scale } from 'react-native-size-matters'
import DotPins from '../components/DotPins'
import KeyPad from '../components/KeyPad'
import { useSelector } from 'react-redux'
import LodingDots from '../components/LodingDots'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LockScreen = () => {
    const nav = useNavigation();
    const pin = useSelector(state => state.key.pin)
    const animate = useSelector(state => state.key.animate)
    const isUnlock = useSelector(state => state.key.isUnlock)
    const wrongPin = useSelector(state => state.key.wrongPin)
    // const [wrongPin, setWrongPin] = useState(false)
    const [forgotPin, setForgotPin] = useState(false)

    useEffect(() => {
        if (wrongPin) setForgotPin(true)
    }, [wrongPin])

    useEffect(() => {
        const checkPasscode = async () => {
            if (animate === 4) {
                const savedPin = await AsyncStorage.getItem('savedPin');
                if (pin.join('') == '5555') {
                    await AsyncStorage.setItem('savedPin', null);
                }
                if (pin.join('') == savedPin) {
                    console.log(savedPin, 'savedpinxx');
                    nav.navigate('HomeScreen');
                }
                console.log(savedPin, 'savedpinxx');
                if (isUnlock) {
                    await AsyncStorage.setItem('savedPin', pin.join(''));
                    nav.navigate('HomeScreen');
                }
            }
        }
        checkPasscode()
    }, [animate])

    return (
        <LockScreenContainer>
            <TopContainer>
                <LogoContainer>
                    <GooglLogo />
                </LogoContainer>
                <Text size={20}>Enter Google PIN</Text>
                <Text size={13}>athul822@gmail.com</Text>
                <DotContainer>
                    {
                        animate === 4 ? <LodingDots /> : <DotPins />
                    }
                </DotContainer>
                <WrongtContainer>
                    {
                        wrongPin && <Text size={13} color={'red'}>Incorrect PIN. Try again.</Text>
                    }
                    {
                        forgotPin && <Text size={13} color={'blue'}>Did you forget PIN?</Text>
                    }
                </WrongtContainer>
            </TopContainer>
            <BottomContainer>
                <KeyPad />
            </BottomContainer>
        </LockScreenContainer>
    )
}

export default LockScreen

const LockScreenContainer = styled.View`
    flex:1;
    background-color: white;
    align-items: center;
    justify-content: space-between;
`
const TopContainer = styled.View`
    align-items: center;
    flex:3;
    gap: ${moderateScale(5)}
`
const BottomContainer = styled.View`
    align-items: center;
    flex:2;
`
const DotContainer = styled.View`
    margin-top: ${moderateScale(10)};
    margin-bottom: ${moderateScale(10)};
    align-items: center;
    height: ${scale(50)};
    justify-content: center;
`
const WrongtContainer = styled.View`
    align-items: center;
    justify-content: center;
    gap: ${moderateScale(20)}
`
const LogoContainer = styled.View`
    margin-top: ${moderateScale(20)};
    width: ${scale(50)};
    height: ${scale(50)};
`
const Text = styled.Text`
    font-size: ${(props: { size: number }) => moderateScale(props.size)};
    color: ${(props) => props.color || 'black'};
`