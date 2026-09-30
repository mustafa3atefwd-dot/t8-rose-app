export interface IBreadcrumbItem {
  labelKey: string;
  href?: string;
  values?: Record<string, string | number>;
}

export interface IBreadcrumbContext {
  pathname: string;
}

export interface IBreadcrumbRoute {
  pattern: RegExp;
  getItems: (
    context: IBreadcrumbContext & {
      matches: RegExpMatchArray;
    }
  ) => IBreadcrumbItem[];
}
