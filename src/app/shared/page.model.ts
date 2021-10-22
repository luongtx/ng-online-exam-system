export class Page {
  constructor(
    public page: number,
    public size: number,
    public totalItem?: number,
    public totalPages?: number,
    public pages?: number[]
  ) { }
}
