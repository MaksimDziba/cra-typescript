class StarService {
  _apiBase = 'https://swapi.dev/api';

  getResource = async (url: string) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  public getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res;
  };
}

export default new StarService();