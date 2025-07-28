import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';

export default function NotFound(): ReactNode {
  const title = translate({
    id: 'theme.NotFound.title',
    message: 'Not Found',
  });

  return (
    <>
      <PageMetadata title={title} />
      <Layout>
        <NotFoundContent />
      </Layout>
    </>
  );
}
