import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../../constants/colors';

const Action = ({ title, onPress }) => {
    return (
        <TouchableOpacity
          style={{
            height: 35,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <Text
            style={{ fontSize: 18, color: colors.text.accent, textAlign: 'left', padding: 0 }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      );
}

export default Action;