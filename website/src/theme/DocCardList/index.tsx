import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import type {Props} from '@theme/DocCardList';
import styles from './styles.module.css';

function DocCardListForCurrentSidebarCategory({className}: Props) {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} />;
}

function DocCardListItem({
  item,
}: {
  item: ComponentProps<typeof DocCard>['item'];
}) {
  // Extract content type from document path
  const getContentType = (href?: string) => {
    if (!href) return 'default';
    if (href.includes('/ideas/')) return 'idea';
    if (href.includes('/prompts/')) return 'prompt';
    if (href.includes('/todos/')) return 'todo';
    if (href.includes('/journal/')) return 'journal';
    if (href.includes('/workflows/')) return 'workflow';
    if (href.includes('/diagrams/')) return 'diagram';
    return 'default';
  };

  const contentType = getContentType(item.href);
  
  return (
    <article className={clsx(
      styles.docCardListItem, 
      styles[`docCardListItem--${contentType}`],
      'col col--6'
    )}>
      <DocCard item={item} />
    </article>
  );
}

export default function DocCardList(props: Props): ReactNode {
  const {items, className} = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row', className)}>
      {filteredItems.map((item, index) => (
        <DocCardListItem key={index} item={item} />
      ))}
    </section>
  );
}
