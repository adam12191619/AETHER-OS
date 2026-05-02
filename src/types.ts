
import React from 'react';

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
}

export interface WindowState {
  id: string;
  appId: string;
  zIndex: number;
  isMaximized: boolean;
  isMinimized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}
