import BasicService from './BasicService'

export default abstract class ResourceService extends BasicService {
  protected abstract resource: string

  public index(query: any = null, ...params: any[]): any {
    let url: string = this.resource

    if (query) {
      url += '?'
      Object.keys(query).forEach((key) => {
        url += key + '=' + encodeURI(query[key]) + '&'
      })
    }

    return this.axios.get(url, ...params)
  }

  public show(id: string|number, ...params: any[]) {
    return this.axios.get(this.resource + '/' + id, ...params)
  }

  public store(data: object, ...params: any[]) {
    return this.axios.post(this.resource, data, ...params)
  }

  public update(id: string|number, data: object, ...params: any[]) {
    return this.axios.put(this.resource + '/' + id, data, ...params)
  }

  public destroy(id: string|number, ...params: any[]) {
    return this.axios.delete(this.resource + '/' + id, ...params)
  }
}
