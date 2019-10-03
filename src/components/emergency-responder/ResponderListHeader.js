import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { searchResponders } from '../../actions/responder/searchResponders.action'
import { filterResponders } from '../../actions/responder/filterResponders.action'

const { Search } = Input

const ResponderListHeader = ({ setDrawerVisibility }) => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.admin.responders)
  const [radioValue, setRadioValue] = useState('all')

  return (
    <div style={styles.wrapper}>
      <Search
        placeholder='Search responder admins...'
        onSearch={value => dispatch(searchResponders(responders, value))}
        style={{ width: 200 }}
      />
      <Radio.Group
        value={radioValue}
        buttonStyle='solid'
        onChange={e => {
          const value = e.target.value
          setRadioValue(value)
          dispatch(filterResponders(responders, value))
        }}>
        <Radio.Button value='all'>
          <strong>All</strong>
        </Radio.Button>
        <Radio.Button value='active'>
          <strong>Active</strong>
        </Radio.Button>
        <Radio.Button value='blocked'>
          <strong>Blocked</strong>
        </Radio.Button>
        <Radio.Button value='archived'>
          <strong>Archived</strong>
        </Radio.Button>
      </Radio.Group>
      <Button
        icon='user-add'
        type='dashed'
        onClick={() => setDrawerVisibility(true)}>
        Add Responder
      </Button>
    </div>
  )
}

ResponderListHeader.propTypes = {
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

export default ResponderListHeader
