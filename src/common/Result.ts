export default class Result {
  public code: number
  public data: any
  public msg: string
  
  public static getResult (data: any, msg = null, code = 200): { data: any, msg: string, code: number } {
    return {
      data,
      msg,
      code
    }
  }
}