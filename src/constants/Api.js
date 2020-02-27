import axios from 'axios';
//Base Url
axios.defaults.baseURL = 'http://localhost:3000/api';
class Api {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  /*
  // Fetching All product
  */
  async getProducts() {
    try {
      const data = await axios.get('/products');
      return data;
    } catch (e) {
      return 'NOT FETCH';
    }
  }

  /*
  // Paginate which page of page in number
  */
  async paginate(page) {
    try {
      const data = await axios.get(`/products?_page=${page}&_limit=15`);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  /*
  // Sorting according to id, price, font
  */
  async sort(item) {
    try {
      const data = await axios.get(`/products?_sort=${item}`);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Ads
   */
  async ads() {
    try {
      const data = await axios.get(
        `/ads/?r=${Math.floor(Math.random() * 1000) % 10}`,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Api();
