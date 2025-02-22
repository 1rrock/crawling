const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

async function crawl() {
  try {
    const url = 'https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=100';
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const decodedData = iconv.decode(data, 'EUC-KR');
    const $ = cheerio.load(decodedData);

    const articles = [];

    // <ul> 태그 안에 있는 <li>들을 찾음 (클래스 없이 태그만 사용)
    $('ul li').each((i, element) => {
      const title = $(element).find('a').text().trim();
      const link = $(element).find('a').attr('href');

      if (title && link) {
        articles.push({ title, link });
      }
    });

    console.log(articles);
  } catch (error) {
    console.error('크롤링 중 오류 발생:', error);
  }
}

crawl();
