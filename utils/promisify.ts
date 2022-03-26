const promisify = <Type>(fn:(...promiseArgs: any[])=>void) => 
  (...args:any[]) =>
    new Promise<Type>((res, rej) => {
      fn(...args, (err: Error, result: any) => {
        if (err) return rej(err)
        return res(result)
      })
    })

export default promisify
