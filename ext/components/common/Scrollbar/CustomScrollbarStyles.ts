import { css, createGlobalStyle } from 'styled-components';

interface ICustomScrollbarProps {
  className: string;
}

export const CustomScrollbarStyles = createGlobalStyle`
     ${({ className }: ICustomScrollbarProps) => css`
       .${className} {
         position: absolute;
         width: 20px;
         right: 0;
         top: 0;
         bottom: 0;
         [data-simplebar] {
           position: relative;
           flex-direction: column;
           flex-wrap: wrap;
           justify-content: flex-start;
           align-content: flex-start;
           align-items: flex-start;
         }

         .simplebar-wrapper {
           overflow: hidden;
           width: inherit;
           height: inherit;
           max-width: inherit;
           max-height: inherit;
         }

         .simplebar-mask {
           direction: inherit;
           position: absolute;
           overflow: hidden;
           padding: 0;
           margin: 0;
           left: 0;
           top: 0;
           bottom: 0;
           right: 0;
           width: auto !important;
           height: auto !important;
           z-index: 0;
         }

         .simplebar-offset {
           direction: inherit !important;
           box-sizing: inherit !important;
           resize: none !important;
           position: absolute;
           top: 0;
           left: 0;
           bottom: 0;
           right: 0;
           padding: 0;
           margin: 0;
           -webkit-overflow-scrolling: touch;
         }

         .simplebar-content-wrapper {
           direction: inherit;
           box-sizing: border-box !important;
           position: relative;
           display: block;
           height: 100%;
           width: auto;
           max-width: 100%;
           max-height: 100%;
           scrollbar-width: none;
           -ms-overflow-style: none;
         }

         .simplebar-content-wrapper::-webkit-scrollbar,
         .simplebar-hide-scrollbar::-webkit-scrollbar {
           width: 0;
           height: 0;
         }

         .simplebar-content:before,
         .simplebar-content:after {
           content: ' ';
           display: table;
         }

         .simplebar-placeholder {
           max-height: 100%;
           max-width: 20px;
           width: 100%;
           pointer-events: none;
         }

         .simplebar-height-auto-observer-wrapper {
           box-sizing: inherit !important;
           height: 100%;
           width: 100%;
           max-width: 1px;
           position: relative;
           float: left;
           max-height: 1px;
           overflow: hidden;
           z-index: -1;
           padding: 0;
           margin: 0;
           pointer-events: none;
           flex-grow: inherit;
           flex-shrink: 0;
           flex-basis: 0;
         }

         .simplebar-height-auto-observer {
           box-sizing: inherit;
           display: block;
           opacity: 0;
           position: absolute;
           top: 0;
           left: 0;
           height: 1000%;
           width: 1000%;
           min-height: 1px;
           min-width: 1px;
           overflow: hidden;
           pointer-events: none;
           z-index: -1;
         }

         .simplebar-track {
           z-index: 1;
           position: absolute;
           right: 0;
           bottom: 0;
           pointer-events: none;
           overflow: hidden;
         }

         [data-simplebar].simplebar-dragging .simplebar-content {
           pointer-events: none;
           user-select: none;
           -webkit-user-select: none;
         }

         [data-simplebar].simplebar-dragging .simplebar-track {
           pointer-events: all;
         }

         .simplebar-scrollbar {
           position: absolute;
           left: 0;
           right: 0;
           min-height: 10px;
         }

         .simplebar-scrollbar:before {
           position: absolute;
           content: '';
           background: black;
           border-radius: 7px;
           left: 2px;
           right: 2px;
           opacity: 0;
           transition: opacity 0.2s 0.5s linear;
         }

         .simplebar-scrolling .simplebar-scrollbar:before,
         .simplebar-hover .simplebar-scrollbar:before,
         .simplebar-mouse-entered .simplebar-scrollbar:before {
           opacity: 0.5;
           transition-delay: 0s;
           transition-duration: 0s;
         }

         .simplebar-scrollbar.simplebar-visible:before {
           /* When hovered, remove all transitions from drag handle */
           opacity: 0.5;
           transition-delay: 0s;
           transition-duration: 0s;
         }

         .simplebar-track.simplebar-vertical {
           top: 0;
           width: 11px;
         }

         .simplebar-scrollbar:before {
           top: 2px;
           bottom: 2px;
           left: 2px;
           right: 2px;
         }

         .simplebar-track.simplebar-horizontal {
           left: 0;
           height: 11px;
         }

         .simplebar-track.simplebar-horizontal .simplebar-scrollbar {
           right: auto;
           left: 0;
           top: 0;
           bottom: 0;
           min-height: 0;
           min-width: 10px;
           width: auto;
         }

         /* Rtl support */
         [data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical {
           right: auto;
           left: 0;
         }

         .simplebar-dummy-scrollbar-size {
           direction: rtl;
           position: fixed;
           opacity: 0;
           visibility: hidden;
           height: 500px;
           width: 500px;
           overflow-y: hidden;
           overflow-x: scroll;
           -ms-overflow-style: scrollbar !important;
         }

         .simplebar-dummy-scrollbar-size > div {
           width: 200%;
           height: 200%;
           margin: 10px 0;
         }

         .simplebar-hide-scrollbar {
           position: fixed;
           left: 0;
           visibility: hidden;
           overflow-y: scroll;
           scrollbar-width: none;
           -ms-overflow-style: none;
         }
       }
     `}
  `;
