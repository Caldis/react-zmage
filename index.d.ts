import * as React from 'react';


declare module 'react-zmage' {

  interface ReactZmage extends React.Component<IReactZmageProps> {
    new(props: IReactZmageProps): ReactZmage;
  }

  var ReactZmage: ReactZmage;

  export default ReactZmage;


  /**
   * @see https://github.com/Caldis/react-zmage#基础配置
   */
  export interface IReactZmageProps {
    src?: string;
    alt?: string;
    set?: IStaticSetParams[];
    defaultPage?: number;
    preset?: TStaticPresetParams;
    hotKey?: IStaticHotKeyParams;
    controller?: IStaticControllerParams;
    backDrop?: string;
    zIndex?: number;
    radius?: number;
    edge?: number;
    onBrowsing?(browsing: boolean): void;
    onZooming?(zooming: boolean): void;
    onSwitching?(paging: number): void;
    onRotating?(deg: number): void;
  }

  /**
   * @see https://github.com/Caldis/react-zmage#set
   */
  export interface IStaticSetParams {
    src: string;
    alt: string;
    style?: CSSStyleDeclaration;
    className?: string;
  }

  /**
   * @see https://github.com/Caldis/react-zmage#hotkey
   */
  export interface IStaticHotKeyParams {
    close?: boolean;
    zoom?: boolean;
    flip?: boolean;
  }

  /**
   * @see https://github.com/Caldis/react-zmage#controller
   */
  export interface IStaticControllerParams {
    close?: boolean;
    zoom?: boolean;
    download?: boolean;
    rotate?: boolean;
    flip?: boolean;
    pagination?: boolean;
  }

  /**
   * @see https://github.com/Caldis/react-zmage#高级配置
   */
  export type TStaticPresetParams = 'auto' | 'desktop' | 'mobile';
}