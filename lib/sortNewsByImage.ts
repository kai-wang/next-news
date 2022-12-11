export default function sortNewsByImage(news: NewsResponse) {
    const withImages = news.data.filter((item) => item.image !== null);
    const withoutImages = news.data.filter((item) => item.image === null);

    const sortedNewsResponse = {
        pagination: news.pagination,
        data: [...withImages, ...withoutImages],
    }

    return sortedNewsResponse;
}