import { People } from "../interfaces/people";

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

  public getAllStarwarsPeople = () => {
    let people: Array<object> = [];
    // first page
    return this.getResource(`/people/`)
      .then((data) => {
        // collect people from first page
        people = data.results;
        return data.count;
      })
      .then((count) => {
        // exclude the first request
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        // start at 2 as you already queried the first page
        for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(this.getResource(`/people?page=${i}`));
        }
        return Promise.all(promises);
      })
      .then((response) => {
        //get the rest records - pages 2 through n.
        people = response.reduce(
          (acc, data) => [...acc, ...data.results],
          people,
        );
        return people;
      })
      .catch((error) => console.log('Properly handle your exception here', error));
  }

  public getSearch = async (query: string) => {
    const res = await this.getResource(`/people/?search=${query}`);
    return res;
  }

  private _extractId = (item: People): string => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)![1];
  };

  public getTargetPeopleList = async(list: Array<People>) => {
    const promises = [];

    for (let i = 0; i < list.length; i++) {
      const id = this._extractId(list[i]);
      promises.push(this.getResource(`/people/${id}/`));
    }
    return Promise.all(promises);
  }

}

export default new StarService();
