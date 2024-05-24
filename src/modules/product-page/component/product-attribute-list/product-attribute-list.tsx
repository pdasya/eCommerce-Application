import React, { FC } from 'react';
import { Attribute } from '@commercetools/platform-sdk';

export const AttributeList: FC<Attribute> = (attribute: Attribute) => {
  const existAttribute = (item: string, field: string) => item.includes(field);
  const { name, value } = attribute;
  if (
    existAttribute(name, 'maker') ||
    existAttribute(name, 'volume') ||
    existAttribute(name, 'size')
  ) {
    return <p>{`${name}: ${value}`}</p>;
  }
  return '';
};
