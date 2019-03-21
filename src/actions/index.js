export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"


export function inc(obj){
  return (dispatch, getState) => {
    setTimeout( () => {
      dispatch({
        type: INCREMENT,
        obj
      })
    }, 2000)
  }
}

export function dec(obj){
  return {
    type: DECREMENT,
    obj
  }
}
