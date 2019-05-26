export interface SidenavItem {
  name: string;
  routeOrFunction?: any;
  matIconName?: string;
  subItems?: SidenavItem[];
}
