type StateProps = {
  content: string | number | undefined
  isShow: boolean
}
type ActionProps = {
  type: string
  payload?: string | number
}
import { INVALID_IP, CURRECT_IP, REST } from "./actions"
const reducer = (state: StateProps, action: ActionProps) => {
  if (action.type === CURRECT_IP) {
    return { isShow: true, content: action.payload }
  }
  if (action.type === REST) {
    return { ...state, isShow: false }
  }
  return state
}
export default reducer
