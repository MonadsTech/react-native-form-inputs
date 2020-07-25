import React, {RefObject, ForwardRefRenderFunction} from 'react';
import {
  Text,
  StyleSheet,
  TextProps,
  StyleProp,
  ViewStyle,
  ViewProps,
  TextStyle,
} from 'react-native';

interface ContentTextProps {
  variant?: string;
  bold?: boolean;
  center?: boolean;
  style: StyleProp<TextStyle>;
}

type TextRef =
  | string
  | ((instance: Text | null) => void)
  | React.RefObject<Text>
  | null
  | undefined;

const ContentTextInternal = (_props: ContentTextProps, ref: TextRef) => {
  const {style, variant = 'default', bold, center, ...props} = _props;
  return (
    <Text
      allowFontScaling={false}
      ref={ref}
      {...props}
      style={[
        styles.root,
        variants[variant] as StyleProp<TextStyle>,
        bold ? styles.bold : {},
        center ? styles.center : {},
        ...(Array.isArray(style) ? style : [style]),
      ]}
    />
  );
};

export const ContentText = React.forwardRef(ContentTextInternal);

const styles = StyleSheet.create({
  root: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 17,
  },
  bold: {fontWeight: 'bold'},
  center: {textAlign: 'center'},
  defaultStyle: {color: '#121212'},
  dimStyle: {color: '#BBB'},
  primary: {color: '#00298A'},
  primaryDark: {color: '#121212'},
});

const variants: Record<string, unknown> = {
  default: styles.defaultStyle,
  dim: styles.dimStyle,
  primary: styles.primary,
  primaryDark: styles.primaryDark,
};
