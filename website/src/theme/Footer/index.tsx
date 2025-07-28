import React, {type ReactNode} from 'react';

import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return (
    <FooterLayout
      style={style}
      links={links && links.length > 0 && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            opacity: 0.7,
            marginBottom: '0.5rem'
          }}>
            ✨ Powered by scrapbook-md ✨
          </div>
          {copyright && <FooterCopyright copyright={copyright} />}
        </div>
      }
    />
  );
}

export default React.memo(Footer);
