import { SERVICE_WORKER_INIT, SERVICE_WORKER_UPDATE, ServiceWorkerActionTypes } from "../actions/types"

interface IServiceWorkerState {
  initialised: boolean
  updated: boolean
  serviceWorkerRegistration?: ServiceWorkerRegistration
}

const initState: IServiceWorkerState = {
  initialised: false,
  updated: false,
}

export const serviceWorkerReducer = (
  state = initState,
  action: ServiceWorkerActionTypes
): IServiceWorkerState => {
  switch (action.type) {
    case SERVICE_WORKER_INIT:
      return {
        ...state,
        initialised: action.payload,
      }
    case SERVICE_WORKER_UPDATE:
      return {
        ...state,
        updated: true,
        serviceWorkerRegistration: action.payload,
      }
    default:
      return state
  }
}
