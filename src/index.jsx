import { append, compose, identity, ifElse, init, intersperse, isEmpty, last, length, map, sort, values } from 'ramda';
import React from 'react';
import { createAdvAgent, throughAgent, throughContainer, throughInterface, ThroughProvider } from 'react-through';

export const breadcrumbsThroughArea = 'breadcrumbs';
export const breadcrumbsBearingKey = 'to';

export const withBreadcrumbs = throughInterface(breadcrumbsThroughArea);
export const withBreadcrumbsItem = throughAgent(breadcrumbsThroughArea, breadcrumbsBearingKey);
export const withBreadcrumbsContainer = throughContainer(breadcrumbsThroughArea);

export const Dummy = () => null;
export const Item = () => null;

export const BreadcrumbsProvider = ThroughProvider;
export const BreadcrumbsItem = createAdvAgent(breadcrumbsThroughArea, breadcrumbsBearingKey);

function prepareProps(props, rename, duplicate, remove) {
  const p = Object.assign({}, props);
  Object.keys(duplicate).forEach(k => {
    p[duplicate[k]] = p[k];
  });
  Object.keys(rename).forEach(k => {
    p[rename[k]] = p[k];
    delete p[k];
  });
  Object.keys(remove).forEach(k => {
    delete p[k];
  });
  return p;
}

const defaultCompare = (a, b) => a[breadcrumbsBearingKey].length - b[breadcrumbsBearingKey].length;

const Breadcrumbs_ = ({
  [breadcrumbsThroughArea]: data = {},

  hideIfEmpty = false,

  compare = defaultCompare,

  container: Container = 'span',
  containerProps = {},
  item: Item = 'a',
  finalItem: FinalItem = Item,
  finalProps = {},
  separator = '/',

  duplicateProps: duplicate = {},
  removeProps: remove = {},
  renameProps: rename = Item === 'a' ? { to: 'href' } : {},
}) => {
  const breadcrumbsData = values(data);

  if (hideIfEmpty && breadcrumbsData.length === 0) {
    return null;
  }

  const separatorElement = <span className="separator">{separator}</span>;

  const sortedBreadcrumbsData = sort(compare, breadcrumbsData);

  const startItems = compose(
    ifElse(isEmpty, identity, append(separatorElement)),
    intersperse(separatorElement),
    map(item => (
      <span className="item">
        <Item {...prepareProps(item, rename, duplicate, remove)} />
      </span>
    )),
    init
  )(sortedBreadcrumbsData);

  const lastData = last(sortedBreadcrumbsData);
  const lastItem = lastData ? (
    <span /*key={length(startItems)}*/ className="item item--final">
      <FinalItem {...prepareProps(lastData, rename, duplicate, remove)} {...finalProps} />
    </span>
  ) : null;

  return (
    <Container {...containerProps}>
      {startItems.map((Item, i) => (
        <Item.type key={i} {...Item.props} />
      ))}
      {lastItem}
    </Container>
  );
};

export const Breadcrumbs = withBreadcrumbsContainer(Breadcrumbs_);
