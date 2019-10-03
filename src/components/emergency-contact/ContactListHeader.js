import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { searchContacts } from '../../actions/contact/searchContacts.action'
import { filterContacts } from '../../actions/contact/filterContacts.action'

const { Search } = Input

const ContactListHeader = ({ setDrawerVisibility }) => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.admin.contacts)
  const [radioValue, setRadioValue] = useState('all')

  return (
    <div style={styles.wrapper}>
      <Search
        placeholder='Search contacts...'
        onSearch={value => {
          setRadioValue('all')
          dispatch(searchContacts(contacts, value))
        }}
        style={{ width: 200 }}
      />
      <Radio.Group
        value={radioValue}
        buttonStyle='solid'
        onChange={e => {
          setRadioValue(e.target.value)
          dispatch(filterContacts(contacts, e.target.value))
        }}>
        <Radio.Button value='all'>
          <strong>All</strong>
        </Radio.Button>
        <Radio.Button value='police'>
          <strong>Police</strong>
        </Radio.Button>
        <Radio.Button value='medical'>
          <strong>Medical</strong>
        </Radio.Button>
        <Radio.Button value='fire'>
          <strong>Fire</strong>
        </Radio.Button>
      </Radio.Group>
      <Button
        icon='plus'
        type='dashed'
        onClick={() => setDrawerVisibility(true)}
        style={{ float: 'right', width: 180 }}>
        Add Contact
      </Button>
    </div>
  )
}

ContactListHeader.propTypes = {
  setDrawerVisibility: PropTypes.func.isRequired
}

const styles = {
  wrapper: {
    width: '70%',
    marginLeft: '15%',
    marginTop: 40,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default ContactListHeader
