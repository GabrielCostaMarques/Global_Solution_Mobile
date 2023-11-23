import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TypingAnimation = ({ text }) => {
  const [typedText, setTypedText] = useState('');
  const cursorAnimationRef = React.createRef();

  useEffect(() => {
    typeText();
  }, []);

  const typeText = async () => {
    const textToType = text.split('');
    const interval = 50;

    for (let i = 0; i < textToType.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      setTypedText((prevText) => prevText + textToType[i]);
    }
    cursorAnimationRef.current?.pulse(900);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Animatable.View>
        
        <Text style={{ fontSize: 24, overflow: 'hidden' }}>{typedText}</Text>

        <Animatable.View 
        ref={cursorAnimationRef} 
        animation="flash"
        easing="ease-out" 
        iterationCount="infinite" 
        style={{ position: 'absolute', top: 5, right: -10 }}>

          <Text style={{ width: 10, height: 24, backgroundColor: '#000' }} />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default TypingAnimation;
