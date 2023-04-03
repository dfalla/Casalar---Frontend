import { LazyExoticComponent } from 'react';

type JSXComponent = () => JSX.Element;

export interface Route { 
    path: string;
    to: string;
    name: string;
    Component: LazyExoticComponent<JSXComponent> | (JSXComponent)
}