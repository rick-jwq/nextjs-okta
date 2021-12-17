import { useQuery, useMutation, useQueryClient } from 'react-query'

const useListData1 = () =>
  useQuery(
    ['listdata1'],
    () => {
      return fetch('/api/listdata').then(res => res.json())
    },
    {
      staleTime: Infinity, // default 0 sec
      cacheTime: 60 * 1000 * 5, // default 5 minutes,
      // keepPreviousData: true,
    }
  )

const useListData2 = () =>
  useQuery(
    ['listdata2'],
    () => {
      return fetch('/api/listdata').then(res => res.json())
    },
    {
      staleTime: 10000, // default 0 sec
      cacheTime: 0, // default 5 minutes,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // keepPreviousData: true,
    }
  )

const useListData = { useListData1, useListData2 }
export default useListData
