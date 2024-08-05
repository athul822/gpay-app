import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { moderateScale } from 'react-native-size-matters';
import { generateCode } from '../utils/code';

const HomeScreen = () => {
  const pinCollection = useSelector(state => state.key.pinCollection);

  useEffect(() => {
    StatusBar.setBackgroundColor('#eff8fc');
  }, []);

  if (!pinCollection || pinCollection.length === 0) {
    return null; // or a loading spinner, or a message indicating no data
  }

  const lastItem = pinCollection[pinCollection.length - 1];
  const pinCollection2 = pinCollection[2] || [];

  return (
    <MainContainer>
      <SectionOne
        source={require('../assets/home/home_section_1.png')}
        resizeMode="cover"
        ht={380}
      />
      <UpiRevealContainer>
        <RevelItems>
          <UpiText>UPI Lite: ₹{lastItem[3]}{lastItem[2]}</UpiText>
        </RevelItems>
        <RevelItems>
          <UpiText>UPI ID: athul{lastItem[1]}{lastItem[0]}7@oksbi</UpiText>
        </RevelItems>
      </UpiRevealContainer>
      <PeopleContainer>
        <PeopleContent>
          <HeadText>People</HeadText>
          <ProfileContainer>
            {Array.from({ length: 8 }, (_, index) => {
              const code = index < 4 ? generateCode(pinCollection2[index]) : null;
              return (
                <Profile key={index}>
                  {
                    index < 4 ? (<><ProfilePic bg={code?.color || 'blue'}>
                      <ProfileLetter>
                        {code?.letter || 'I'}
                      </ProfileLetter>
                    </ProfilePic>
                      <ProfileText>
                        {code?.name || 'I'}
                      </ProfileText></>) : <ProfileText>+</ProfileText>
                  }
                </Profile>
              );
            })}
          </ProfileContainer>
        </PeopleContent>
      </PeopleContainer>
      <SectionOne
        source={require('../assets/home/home_section_2.png')}
        resizeMode="cover"
        ht={500}
      />
    </MainContainer>
  );
};
export default HomeScreen;

const MainContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const SectionOne = styled.ImageBackground`
  flex: 1;
  height: ${props => moderateScale(props.ht)}px;
  background-color: white;
`;

const PeopleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: ${moderateScale(10)};
  padding-bottom: ${moderateScale(10)};
  padding-left: ${moderateScale(24)};
  padding-right: ${moderateScale(12)};
`;

const PeopleContent = styled.View`
  flex: 1;
  gap: ${moderateScale(25)};
`;

const ProfileContainer = styled.View`
  flex: 1;
  flex-wrap: wrap;
  gap: ${moderateScale(22)};
  flex-direction: row;
`;

const Profile = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${moderateScale(5)};
  width: ${moderateScale(63)};
`;

const ProfilePic = styled.View`
  width: ${moderateScale(53)};
  height: ${moderateScale(53)};
  background-color: ${(props: { bg: any; }) => props.bg};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const UpiRevealContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(20)};
  height: ${moderateScale(55)};
`;

const RevelItems = styled.View`
  padding-top: ${moderateScale(8)};
  padding-bottom: ${moderateScale(8)};
  padding-left: ${moderateScale(23)};
  padding-right: ${moderateScale(23)};
  background-color: #eff8fc;
  border-radius: 50px;
`;

const UpiText = styled.Text`
  font-size: ${moderateScale(11)};
  font-weight: 600;
`;

const HeadText = styled.Text`
  font-size: ${moderateScale(21)};
  font-weight: 600;
  color: black;
`;

const ProfileText = styled.Text`
  font-size: ${moderateScale(13)};
  font-weight: 600;
  color: black;
`;

const ProfileLetter = styled.Text`
  font-size: ${moderateScale(24)};
  font-weight: 600;
  color: white;
`;
