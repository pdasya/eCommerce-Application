import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';
import styles from './custom-router-link.component.module.scss';

interface ICustomRouterLinkProperties extends LinkProps {
  activeClassName?: string;
}

const defaultProperties = {
  activeClassName: '',
};

export const CustomRouterLink = ({
  children,
  to,
  activeClassName = '',
  ...props
}: ICustomRouterLinkProperties): React.JSX.Element => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      {...props}
      className={classNames(styles.link, props.className, match && activeClassName)}>
      {children}
    </Link>
  );
};

CustomRouterLink.defaultProps = defaultProperties;
