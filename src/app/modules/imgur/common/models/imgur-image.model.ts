export class ImgurImage {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  views: number;
  link: string;

  constructor(params: any) {
    if (params) {
      this.id = params.id;
      this.title = params.title;
      this.description = params.description;
      this.datetime = params.datetime;
      this.type = params.type;
      this.views = params.views;
      this.link = params.link;
    }
  }
}
