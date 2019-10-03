import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../../actions/contact/getContacts.action'
import { List } from 'antd'

import Spinner from '../Spinner'
import EditContact from './EditContact'
import ContactListItem from './ContactListItem'

const ContactsList = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.admin.contacts)
  const filteredContacts = useSelector(state => state.admin.filteredContacts)
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    // TODO -R
    async function fetchData() {
      await dispatch(getContacts())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Contacts...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <EditContact />
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredContacts || contacts}
        renderItem={contact => {
          return <ContactListItem contact={contact} />
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

export default ContactsList
