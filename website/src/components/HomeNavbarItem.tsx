import React from 'react';
import Link from '@docusaurus/Link';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';

export default function HomeNavbarItem(): React.JSX.Element {
  return (
    <Link
      to="/"
      className="navbar__item navbar__link"
      aria-label="Home"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.75rem',
      }}
    >
      <Icon path={mdiHome} size={1} />
    </Link>
  );
}
