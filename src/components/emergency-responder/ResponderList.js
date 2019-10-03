import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List } from 'antd'

import EditResponderModal from './EditResponder'
import ResponderListItem from './ResponderListItem'
import Spinner from '../Spinner'

import { getResponders } from '../../actions/responder/getResponders.action'

const ResponderList = () => {
  const dispatch = useDispatch()
  const [fetching, setFetchingStatus] = useState(true)
  const responders = useSelector(state => state.admin.responders)
  const filteredResponders = useSelector(
    state => state.admin.filteredResponders
  )

  useEffect(() => {
    // TODO -R
    async function fetchData() {
      await dispatch(getResponders())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Responders...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <EditResponderModal />
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredResponders || responders}
        renderItem={responder => {
          return <ResponderListItem responder={responder} />
        }}
      />
    </div>
  )
}

const styles = {
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default ResponderList
