import React, { ComponentType, FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Breadcrumbs } from '@mui/material';
import classNames from 'classnames';
import styles from './breadcrumb.component.module.scss';

type PathItem = { caption: string; id?: string };

type ComponentConstructor = ComponentType | ComponentType<PropsWithChildren<unknown>>;

type BreadcrumbProps = {
  path: PathItem[];
  rootSegment?: PathItem;
  ItemComponent?: ComponentConstructor;
  LastItemComponent?: ComponentConstructor;
  separatorElement?: ReactElement;
  itemProps?: Record<string, unknown>;
  lastItemProps?: Record<string, unknown>;
  onClick?: (target: PathItem) => void;
};

export const Breadcrumb: FC<BreadcrumbProps> = ({
  path,
  rootSegment,
  ItemComponent,
  LastItemComponent,
  separatorElement = '>',
  itemProps = {},
  lastItemProps = {},
  onClick,
}) => {
  const renderSegment = (
    item: PathItem,
    Component = ItemComponent,
    props = itemProps,
    isLast = false,
  ) => (
    <button
      type="button"
      key={item.id || item.caption}
      onClick={() => !isLast && onClick && onClick(item)}
      onKeyDown={() => !isLast && onClick && onClick(item)}
      className={classNames(styles.button, isLast ? styles.tail : styles.item)}>
      {Component ? <Component {...props}>{item.caption}</Component> : item.caption}
    </button>
  );

  const renderRootSegment = (isLast: boolean) =>
    rootSegment ? [renderSegment(rootSegment, ItemComponent, itemProps, isLast)] : [];

  const renderPath = () => {
    const segments: ReactNode[] = [];

    for (let i = 0; i < path.length - 1; i += 1) {
      segments.push(renderSegment(path[i]));
    }

    return segments;
  };

  const renderLastSegment = () => {
    if (!path.length) {
      return [];
    }

    const lastItem = path[path.length - 1];

    return [renderSegment(lastItem, LastItemComponent, lastItemProps || itemProps, true)];
  };

  const renderedFullPath = () => {
    const lastSegmentLayout = renderLastSegment();
    const middlePathLayout = renderPath();
    const rootSegmentLayout = renderRootSegment(!lastSegmentLayout.length);

    return [
      ...rootSegmentLayout,
      ...middlePathLayout,
      ...lastSegmentLayout,
    ];
  };

  return (
    <div className={styles.root}>
      <Breadcrumbs aria-label="breadcrumb" separator={separatorElement}>
        {renderedFullPath()}
      </Breadcrumbs>
    </div>
  );
};
