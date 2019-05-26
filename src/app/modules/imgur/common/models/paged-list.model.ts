import {isNullOrUndefined} from 'util';
import flatten from 'lodash-es/flatten';

export class PagedList<T> {
  private pageNumber: number;
  private itemsPerPage: Map<number, Array<T>>;

  constructor() {
    this.pageNumber = 0;
    this.itemsPerPage = new Map();
  }

  currentPage(): number {
    return this.pageNumber;
  }

  nextPage(): number {
    return this.pageNumber + 1;
  }

  hasNextPage(): boolean {
    const currentPageItems = this.itemsPerPage.get(this.pageNumber);
    return currentPageItems && !!currentPageItems.length;
  }

  getItems(page?: number): Array<T> {
    // page = 0 will be false in an IF statement
    // so rather we check for null or undefined
    if (!isNullOrUndefined(page)) {
      return this.itemsPerPage.get(page) || [];
    } else {
      return flatten(Array.from(this.itemsPerPage.values()));
    }
  }

  addItems(page: number, items: Array<T>) {
    this.pageNumber = page;
    this.itemsPerPage.set(page, items);
  }
}
