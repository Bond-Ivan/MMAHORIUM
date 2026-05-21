export type NewsType = {
  id: number;
  titleKey: string;
  textKey: string;
  dateKey: string;
  image: string;
  typeKey: string;
};

const news: NewsType[] = [
  {
    id: 1,
    titleKey: "news.items.1.title",
    textKey: "news.items.1.text",
    dateKey: "news.items.1.date",
    image: "https://ss.sport-express.ru/userfiles/materials/214/2145799/1180x665.jpg",
    typeKey: "news.types.rankings",
  },
  {
    id: 2,
    titleKey: "news.items.2.title",
    textKey: "news.items.2.text",
    dateKey: "news.items.2.date",
    image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1NV84z.img?w=952&h=556&m=4&q=100",
    typeKey: "news.types.top",
  },
  {
    id: 3,
    titleKey: "news.items.3.title",
    textKey: "news.items.3.text",
    dateKey: "news.items.3.date",
    image: "https://cdn-storage-media.tass.ru/resize/1312x868/tass_media/2023/10/20/R/1697836291668809_RALtzSjY.jpg",
    typeKey: "news.types.announcements",
  },
  {
    id: 4,
    titleKey: "news.items.4.title",
    textKey: "news.items.4.text",
    dateKey: "news.items.4.date",
    image: "https://www.bjpenn.com/wp-content/uploads/2025/03/Carlos-Ulberg-Jiri-Prochazka.jpg",
    typeKey: "news.types.rankings",
  },
];

export default news;