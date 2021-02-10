import React, {
  createRef,
  FocusEvent,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  PureComponent,
  RefObject,
} from 'react';

import { OverflowMenu } from '../OverflowMenu';
import { KEY_CODES } from '../common';

import { BreadcrumbsComponent } from './BreadcrumbsComponent';
import { OverflowMenuWrapper } from './OverflowMenuWrapper';
import { Item } from './components/Item';
import { Separator } from './components/Separator';

const MAX_WIDTH = 800;
const OVERFLOW_MENU_ID = 1;

export interface IBreadcrumbsProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Список элементов */
  list: Array<IBreadcrumbsItem>;
  /** Мобильный вид компонента */
  mobile?: boolean;
  /** Маленький размер компонента */
  small?: boolean;
}

export interface IBreadcrumbsItem {
  /** Подпись к элементу */
  label: string;
  /** url элемента */
  url?: string;
}

interface IBreadcrumbsState {
  focusedItemId: number | null;
  hiddenItems: Array<IBreadcrumbsItem & { id: number }>;
  items: Array<IBreadcrumbsItem & { id: number }>;
  overflowMenuFocused: boolean;
}

export class Breadcrumbs extends PureComponent<IBreadcrumbsProps, IBreadcrumbsState> {
  selfRef: RefObject<HTMLDivElement>;
  overflowMenuRef: RefObject<HTMLDivElement>;

  constructor(props: IBreadcrumbsProps) {
    super(props);
    this.selfRef = createRef();
    this.overflowMenuRef = createRef();

    this.state = {
      focusedItemId: null,
      hiddenItems: [],
      items: [],
      overflowMenuFocused: false,
    };
  }

  static getDerivedStateFromProps({ list }: IBreadcrumbsProps) {
    return {
      items: list.map((listItem, idx) => ({
        ...listItem,
        id: idx,
      })),
    };
  }

  componentDidMount() {
    const { mobile } = this.props;
    if (mobile) return;

    const selfNode = this.selfRef.current;
    if (!selfNode) return;

    const { width } = selfNode.getBoundingClientRect();
    if (width > MAX_WIDTH) {
      this.hideItem();
    }
  }

  componentDidUpdate() {
    const { mobile } = this.props;
    if (mobile) return;

    const selfNode = this.selfRef.current;
    if (!selfNode) return;

    const { width } = selfNode.getBoundingClientRect();
    if (width > MAX_WIDTH) {
      this.hideItem();
    }
  }

  handleOverflowMenuChange = ({ value }: { value: string }) => window.location.assign(value);

  handleOverflowMenuBlur = () => {
    this.selfRef.current?.focus();
    this.setState({ overflowMenuFocused: false });
  };

  handleItemClick = (id: number) => {
    const { items } = this.state;
    const last = id === items[items.length - 1].id;

    const targetItem = this.getItemById(id);

    targetItem && targetItem.url && !last && window.location.assign(targetItem.url);
  };

  // To prevent focus event, firing before click
  handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    this.setState({ focusedItemId: null });
    event.preventDefault();
  };

  handleFocus = ({ currentTarget, target }: FocusEvent<HTMLDivElement>) => {
    const { focusedItemId } = this.state;
    if (currentTarget === target) {
      const { items } = this.state;
      this.setState({ focusedItemId: focusedItemId ?? items[0].id });
    }
  };

  handleBlur = () => {
    const { overflowMenuFocused } = this.state;
    if (!overflowMenuFocused) {
      this.setState({ focusedItemId: null });
    }
  };

  handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { focusedItemId, hiddenItems } = this.state;

    if (event.keyCode === KEY_CODES.LEFT) {
      this.focusPreviousItem();
    }

    if (event.keyCode === KEY_CODES.RIGHT) {
      this.focusNextItem();
    }

    if (event.keyCode === KEY_CODES.ENTER) {
      if (hiddenItems.length && focusedItemId === OVERFLOW_MENU_ID) {
        return;
      }
      const focusedItem = typeof focusedItemId === 'number' && this.getItemById(focusedItemId);
      focusedItem && focusedItem.url && window.location.assign(focusedItem.url);
    }
  };

  focusPreviousItem = () => {
    const { focusedItemId, hiddenItems, items } = this.state;
    if (focusedItemId === null) return;
    if (focusedItemId === OVERFLOW_MENU_ID) {
      this.overflowMenuRef.current?.blur();
    }

    const previousItemId = focusedItemId - 1;
    const firstItemId = items[0].id;

    if (!hiddenItems.length && previousItemId >= firstItemId) {
      this.setState({ focusedItemId: previousItemId });
      return;
    }

    const previousItemHidden = this.getHiddenItemById(previousItemId);

    if (previousItemHidden) {
      this.setState({ focusedItemId: OVERFLOW_MENU_ID, overflowMenuFocused: true }, () => {
        this.overflowMenuRef.current?.focus();
      });
      return;
    }

    if (previousItemId >= firstItemId) {
      this.setState({ focusedItemId: previousItemId });
    }
  };

  focusNextItem = () => {
    const { focusedItemId, hiddenItems, items } = this.state;
    if (focusedItemId === null) return;
    if (focusedItemId === OVERFLOW_MENU_ID) {
      this.overflowMenuRef.current?.blur();
    }

    const nextItemId = focusedItemId + 1;
    const lastItemId = items[items.length - 1].id;

    if (!hiddenItems.length && nextItemId < lastItemId) {
      this.setState({ focusedItemId: nextItemId });
      return;
    }

    if (nextItemId === OVERFLOW_MENU_ID && nextItemId < lastItemId) {
      this.setState({ focusedItemId: OVERFLOW_MENU_ID, overflowMenuFocused: true }, () => {
        this.overflowMenuRef.current?.focus();
      });
      return;
    }

    const nextItemHidden = this.getHiddenItemById(nextItemId);
    if (nextItemHidden) {
      const nextVisibleItem = this.getNextVisibleItem();
      const nextVisibleItemId = nextVisibleItem && nextVisibleItem.id;
      this.setState({
        focusedItemId: nextVisibleItemId || focusedItemId,
      });
      return;
    }

    if (nextItemId < lastItemId) {
      this.setState({ focusedItemId: nextItemId });
      return;
    }
  };

  getItemById = (itemId: number) => {
    const { items } = this.state;
    return items.find(({ id }) => id === itemId);
  };

  getHiddenItemById = (itemId: number) => {
    const { hiddenItems } = this.state;
    return hiddenItems.find(({ id }) => id === itemId);
  };

  getNextVisibleItem = () => {
    const { hiddenItems } = this.state;
    const lastHiddenItem = hiddenItems[hiddenItems.length - 1];
    const nextVisibleItem = this.getItemById(lastHiddenItem && lastHiddenItem.id + 1);
    return nextVisibleItem;
  };

  hideItem = () => {
    const { hiddenItems } = this.state;
    if (!hiddenItems.length) {
      const firstItemToHide = this.getItemById(OVERFLOW_MENU_ID);
      firstItemToHide &&
        hiddenItems.push(firstItemToHide) &&
        this.setState({ hiddenItems }, () => {
          this.forceUpdate();
        });
    } else {
      const lastHiddenItem = hiddenItems[hiddenItems.length - 1];
      const nextItemToHideId = lastHiddenItem.id + 1;
      const nextItemToHide = this.getItemById(nextItemToHideId);
      nextItemToHide &&
        hiddenItems.push(nextItemToHide) &&
        this.setState({ hiddenItems }, () => {
          this.forceUpdate();
        });
    }
  };

  renderContent = () => {
    const { items } = this.state;

    return items.map(({ id, label, url }) => {
      const hiddenItem = this.getHiddenItemById(id);

      if (!hiddenItem) {
        return this.renderItem({ id, label, url });
      }

      if (hiddenItem && id === OVERFLOW_MENU_ID) {
        return this.renderOverflowMenu();
      }

      return false;
    });
  };

  renderItem = ({ id, label, url }: IBreadcrumbsItem & { id: number }) => {
    const { mobile, small } = this.props;
    const { focusedItemId, items } = this.state;
    const last = id === items[items.length - 1].id;

    return (
      <Fragment key={id}>
        <Item
          focused={focusedItemId === id}
          id={id}
          label={label}
          last={last}
          mobile={mobile}
          small={small}
          url={url}
          onClick={this.handleItemClick}
        />
        {!last && <Separator small={small || mobile} />}
      </Fragment>
    );
  };

  renderOverflowMenu = () => {
    const { mobile, small } = this.props;
    const { hiddenItems } = this.state;

    const overflowMenuList = hiddenItems.map(({ id, label, url }) => ({
      id: id,
      label: label,
      value: url,
    }));

    return (
      <Fragment key="overflowMenu">
        <OverflowMenuWrapper small={small || mobile}>
          <OverflowMenu
            innerRef={this.overflowMenuRef}
            list={overflowMenuList}
            size={'small'}
            onBlur={this.handleOverflowMenuBlur}
            onChange={this.handleOverflowMenuChange}
          />
        </OverflowMenuWrapper>
        <Separator small={small || mobile} />
      </Fragment>
    );
  };

  render() {
    const { className, dataTestId, mobile, small } = this.props;
    return (
      <BreadcrumbsComponent
        className={className}
        data-test-id={dataTestId}
        ref={this.selfRef}
        small={small || mobile}
        tabIndex={1}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
      >
        {this.renderContent()}
      </BreadcrumbsComponent>
    );
  }
}
