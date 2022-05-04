// /** @jsx jsx */
// import {jsx} from '@emotion/core'

import * as React from 'react'
// import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
// import {setQueryDataForBook} from 'utils/books'
// import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'

async function bootstrapAppData() {
  let user = null;

  const token = await auth.getToken()
  if (token) {
    const data = await client('bootstrap', {token})
    // queryCache.setQueryData('list-items', data.listItems, {
    //   staleTime: 5000,
    // })
    // for (const listItem of data.listItems) {
    //   setQueryDataForBook(listItem.book)
    // }
    user = data.user
  }
  return user
}

async function accountData() {
  let user = localStorage.getItem("__account__")
  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = accountData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    // queryCache.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({user, login, logout, register}),
    [login, logout, register, user],
  )

  if (isLoading || isIdle || isError) {
    return <></>
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

// function useAuth() {
//   const context = React.useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error(`useAuth must be used within a AuthProvider`)
//   }
//   return context
// }

function useAuth() {
  return localStorage.getItem("__account__")
}

// function useClient() {
//   const {user} = useAuth()
//   const token = user?.token
//   return React.useCallback(
//     (endpoint, config) => client(endpoint, {...config, token}),
//     [token],
//   )
// }
function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return client();
}

export {AuthProvider, useAuth, useClient}
