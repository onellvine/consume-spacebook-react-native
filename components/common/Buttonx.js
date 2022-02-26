import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../../constants/colors';

const Buttonx = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity
          style={{
            borderRadius: 8,
            height: 35,
            marginVertical: 10,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.themes.secondary
          }}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <Text
            style={style}
          >
            {title}
          </Text>
        </TouchableOpacity>
      );
}

export default Buttonx;