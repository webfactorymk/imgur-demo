export interface SidenavItem {
  name: string;
  route?: string;
  matIconName?: string;
  subItems?: SidenavItem[];
}
