import { Link, LinkProps } from 'expo-router';
import React from 'react';
import ThemedText from './ThemedText';

interface ThemedLinkProps extends Omit<LinkProps, 'children'> {
  children: React.ReactNode;
  textStyle?: object;
}

const ThemedLink: React.FC<ThemedLinkProps> = ({
  href,
  children,
  style,
  textStyle = {},
}) => {
  return (
    <Link href={href} style={style}>
      <ThemedText style={textStyle}>{children}</ThemedText>
    </Link>
  );
};

export default ThemedLink;
