export default class SwapiService {
  async getID() {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await response.json();
    return data.searchId;
  }

  async getInfo(id) {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
    if (response.status === 500) {
      return this.getInfo(id);
    }
    if (response.status === 404) {
      throw new Error('This is end of this line!');
    }
    const data = await response.json();
    return data;
  }
}
