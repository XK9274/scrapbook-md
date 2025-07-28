import React, {type ComponentProps} from 'react';
import Head from '@docusaurus/Head';
import MDXCode from '@theme/MDXComponents/Code';
import MDXA from '@theme/MDXComponents/A';
import MDXPre from '@theme/MDXComponents/Pre';
import MDXDetails from '@theme/MDXComponents/Details';
import MDXHeading from '@theme/MDXComponents/Heading';
import MDXUl from '@theme/MDXComponents/Ul';
import MDXLi from '@theme/MDXComponents/Li';
import MDXImg from '@theme/MDXComponents/Img';
import Admonition from '@theme/Admonition';
import MermaidWithPopout from '@theme/MermaidWithPopout';

import type {MDXComponentsObject} from '@theme/MDXComponents';

// Custom components for scrapbook content types
const ScrapbookPrompt = ({children, category}: {children: React.ReactNode, category?: string}) => (
  <div style={{
    background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%)',
    border: '1px solid #ff6b35',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    borderLeft: '4px solid #ff6b35'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#ff6b35',
      fontWeight: 'bold'
    }}>
      PROMPT {category && `• ${category.toUpperCase()}`}
    </div>
    {children}
  </div>
);

const ScrapbookIdea = ({children}: {children: React.ReactNode}) => (
  <div style={{
    background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)',
    border: '1px solid var(--ifm-color-primary)',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    borderLeft: '4px solid var(--ifm-color-primary)'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: 'var(--ifm-color-primary)',
      fontWeight: 'bold'
    }}>
      IDEA
    </div>
    {children}
  </div>
);

const ScrapbookTodo = ({children, priority}: {children: React.ReactNode, priority?: string}) => (
  <div style={{
    background: 'linear-gradient(135deg, #f0fff4 0%, #e6f7e6 100%)',
    border: '1px solid #28a745',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    borderLeft: '4px solid #28a745'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#28a745',
      fontWeight: 'bold'
    }}>
      TODO {priority && `• ${priority.toUpperCase()} PRIORITY`}
    </div>
    {children}
  </div>
);

const ScrapbookJournal = ({children}: {children: React.ReactNode}) => (
  <div style={{
    background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%)',
    border: '1px solid #ff6b35',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    borderLeft: '4px solid #ff6b35'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#ff6b35',
      fontWeight: 'bold'
    }}>
      JOURNAL
    </div>
    {children}
  </div>
);

const ScrapbookWorkflow = ({children, category}: {children: React.ReactNode, category?: string}) => (
  <div style={{
    background: 'linear-gradient(135deg, #f0fff0 0%, #e6ffe6 100%)',
    border: '1px solid #20c997',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    borderLeft: '4px solid #20c997'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#20c997',
      fontWeight: 'bold'
    }}>
      WORKFLOW {category && `• ${category.toUpperCase()}`}
    </div>
    {children}
  </div>
);

const ScrapbookDiagram = ({children, type}: {children: React.ReactNode, type?: string}) => (
  <div style={{
    background: 'linear-gradient(135deg, #fff9f0 0%, #fff2e0 100%)',
    border: '1px solid #fd7e14',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    borderLeft: '4px solid #fd7e14'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#fd7e14',
      fontWeight: 'bold'
    }}>
      DIAGRAM {type && `• ${type.toUpperCase()}`}
    </div>
    {children}
  </div>
);

const MDXComponents: MDXComponentsObject = {
  Head,
  details: MDXDetails, // For MD mode support, see https://github.com/facebook/docusaurus/issues/9092#issuecomment-1602902274
  Details: MDXDetails,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  ul: MDXUl,
  li: MDXLi,
  img: MDXImg,
  h1: (props: ComponentProps<'h1'>) => <MDXHeading as="h1" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <MDXHeading as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <MDXHeading as="h3" {...props} />,
  h4: (props: ComponentProps<'h4'>) => <MDXHeading as="h4" {...props} />,
  h5: (props: ComponentProps<'h5'>) => <MDXHeading as="h5" {...props} />,
  h6: (props: ComponentProps<'h6'>) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: MermaidWithPopout,
  // Custom scrapbook components
  ScrapbookPrompt,
  ScrapbookIdea,
  ScrapbookTodo,
  ScrapbookJournal,
  ScrapbookWorkflow,
  ScrapbookDiagram,
};

export default MDXComponents;
