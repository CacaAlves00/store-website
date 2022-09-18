import React, { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {

  const [storage, setStorage] = useState(() => {
    const jsonStorage = localStorage.getItem(key)
    if (jsonStorage != null) return JSON.parse(jsonStorage)

    if (typeof(initialValue) === 'function') {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storage))
  }, [key, storage])

  return [storage, setStorage] as [typeof storage, typeof setStorage]
}

export default useLocalStorage