import React from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  TextStyle,
  Text,
} from 'react-native';
import {ContentText} from '../ContentText';

function combineStyles(
  ...args: StyleProp<ViewStyle>[]
): StyleProp<ViewStyle>[] {
  return Array.from(args).flat() as StyleProp<ViewStyle>[];
}

interface InputTextProps {
  value: unknown;
  onChange: () => unknown;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  focus?: boolean;
  focusColor?: ColorValue;
  errorColor?: ColorValue;
}

const InputText = React.forwardRef((_props: InputTextProps, ref) => {
  const {
    value,
    onChange,
    label,
    disabled = false,
    loading = false,
    error = false,
    containerStyle = {},
    // style,
    inputStyle = {},
    focus = false,
    focusColor = '#0029AE',
    errorColor = '#EE2929',
    labelStyle,
    ...props
  } = _props;

  const [isFocused, setIsFocused] = React.useState(focus);

  return (
    <View style={combineStyles(styles.root, containerStyle)}>
      {label && (
        <ContentText
          style={[
            styles.label,
            labelStyle,
            isFocused && focusColor ? {color: focusColor} : {},
            error ? {color: errorColor} : {},
          ]}>
          {label}
        </ContentText>
      )}
      {/* // </ContentText> */}

      <View style={combineStyles(styles.inputWrapper)}>
        <TextInput
          style={[styles.input, inputStyle]}
          editable={!disabled ? true : false}
          value={value ? `${value}` : ''}
          onChangeText={onChange}
          allowFontScaling={false}
          {...props}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={isFocused && focusColor ? focusColor : '#333'}
          />
        )}
      </View>
    </View>
  );
});

export {InputText};

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
    marginBottom: 4,
    // backgroundColor: 'red',
  },
  inputWrapper: {
    borderRadius: 2,
    borderBottomWidth: 1,
    marginTop: 0,
    flexDirection: 'row',
  },
  input: {
    borderWidth: 0,
    padding: 0,
    // paddingLeft: 6,
    flexGrow: 1,
    color: 'black',
    fontSize: 14,
    lineHeight: 17,
  },
  label: {
    marginBottom: 10,
  },
  error: {
    textAlign: 'right',
  },
});
