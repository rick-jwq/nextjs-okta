import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import useListData from '../hooks/useListData'
import { NextPageWithLayout } from './_app'

const List1 = () => {
  const { data, status } = useListData.useListData1()
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  if (status === 'error') {
    return <p>Error :(</p>
  }
  return (
    <ul>
      {data.data.map((text: string, index: number) => (
        <li key={index}>
          <Typography variant='h6'>
            <a>{text}</a>
          </Typography>
        </li>
      ))}
    </ul>
  )
}

const List2 = () => {
  const { data, status } = useListData.useListData2()
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  if (status === 'error') {
    return <p>Error :(</p>
  }
  return (
    <ul>
      {data.data.map((text: string, index: number) => (
        <li key={index}>
          <Typography variant='h6'>
            <a>{text}</a>
          </Typography>
        </li>
      ))}
    </ul>
  )
}

const List: NextPageWithLayout = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(() => removeFirst(), {
    onSuccess: async () => {
      console.log('mutated successfully')
      queryClient.invalidateQueries('listdata1')
    },
    onError: (error, variables, context) => {
      console.log('mutated error')
    },
    onSettled: (data, error, variables, context) => {
      console.log('mutated settled')
    },
  })

  const removeFirst = async () => await fetch('/api/listdata', { method: 'post' })

  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <button
        onClick={(event: any) => {
          event.preventDefault()
          mutation.mutate()
        }}
      >
        Trigger refetch
      </button>
      <Typography variant='h2'>Texts</Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <List1 />
        <List2 />
      </div>
    </div>
  )
}

List.requireAuth = true

export default List
