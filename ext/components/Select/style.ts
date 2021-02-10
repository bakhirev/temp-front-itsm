import { OPTION_PADDING } from './constants';

export const colorStyles = ({ size }: any) => {
  return {
    dropdownIndicator: (styles: any) => {
      return {
        ...styles,
        display: 'flex',
      };
    },
    indicatorSeparator: () => ({}),
    noOptionsMessage: (base: any) => ({
      ...base,
      textAlign: 'left',
      padding: OPTION_PADDING[size],
    }),
    input: (styles: any) => ({
      ...styles,
      marginLeft: '0 !important',
    }),
  };
};
