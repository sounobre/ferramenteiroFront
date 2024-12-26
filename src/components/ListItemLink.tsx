import * as React from 'react';
import Link from 'next/link';
import { ListItem, ListItemProps } from '@mui/material';

type ListItemLinkProps = {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  selected?: boolean;
} & Omit<ListItemProps, 'button'>;

const ListItemLink = React.forwardRef<HTMLAnchorElement, ListItemLinkProps>((props, ref) => {
  const { href, as, replace, scroll, shallow, prefetch, locale, selected, ...other } = props;

  if (!href) {
    console.error("O 'href' não foi passado para o ListItemLink.");
    return null;
  }

  console.log("ListItemLink props:", { href, as, replace, scroll, shallow, prefetch, locale, selected, other });

  return (
    <Link href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch} locale={locale} passHref>
      <ListItem button component="a" ref={ref} selected={selected} {...other} />
      
    </Link>
  );
});

export default ListItemLink;
