import React from 'react';

import { Link } from 'expo-router';
import ThemedText from './ThemedText';

const ThemedLink = ({ href, children, style, textStyle = {} }) => {
  return (
    <Link href={href} style={style}>
      <ThemedText style={textStyle}>{children}</ThemedText>
    </Link>
  );
};

export default ThemedLink;