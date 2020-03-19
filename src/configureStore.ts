import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { History } from 'history'
import { createRootReducer , rootSaga } from './store'
import { IAppState } from './store/types'

export default function configureStore(history: History,): Store<IAppState> {
  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )
  sagaMiddleware.run(rootSaga)
  return store
}
