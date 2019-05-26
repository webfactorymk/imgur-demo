export class ImgurImage {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  views: number;
  topic: string;
  accountUrl: string;
  link: string;
  ups: number;
  downs: number;

  constructor(params: any) {
    if (params) {
      this.id = params.id;
      this.title = params.title;
      this.description = params.description;
      this.datetime = params.datetime;
      this.type = params.type;
      this.views = params.views;
      this.topic = params.topic;
      this.accountUrl = params.accountUrl;
      this.link = params.link;
      this.ups = params.ups;
      this.downs = params.downs;
    }
  }
}
