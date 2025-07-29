import React from 'react';
import MermaidWithPopout from '@theme/MermaidWithPopout';
import type {Props} from '@theme/Mermaid';

export default function Mermaid(props: Props): JSX.Element {
  return <MermaidWithPopout {...props} />;
}