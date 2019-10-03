import React, { useEffect, useState } from 'react'
import {
  Layout,
  Drawer,
  Button,
  Input,
  Form,
  List,
  Tooltip,
  Icon,
  Popconfirm,
  Avatar,
  Tag,
  Radio
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Formik } from 'formik'
import { CreateAlertSchema } from '../schema/alert.schema'
import GenericTextArea from '../components/GenericTextArea'
import { createAlert } from '../actions/emergency-alert/createEmergencyAlert.action'
import { getEmergencyAlerts } from '../actions/emergency-alert/getEmergencyAlerts.action'
import moment from 'moment'
import { updateEmergencyAlert } from '../actions/emergency-alert/updateEmergencyAlert.action'
import { getTagColor } from '../helpers/common/getTagColor'
import { filterResponders } from '../actions/responder/filterResponders.action'

const EmergencyAlerts = () => {
  const dispatch = useDispatch()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [filter, setFilter] = useState('all')
  const { alerts } = useSelector(({ admin }) => admin)

  useEffect(() => {
    dispatch(getEmergencyAlerts())
  }, [])

  const filteredAlerts =
    filter === 'all' ? alerts : alerts.filter(alert => alert.status === filter)

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Alerts - wiwu admin</title>
      </Helmet>

      <Drawer
        title={
          <b>
            {selectedAlert ? 'Edit Emergency Alert' : 'Create Emergency Alert'}
          </b>
        }
        width={550}
        destroyOnClose={true}
        maskClosable={true}
        keyboard={false}
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => {
          setSelectedAlert(null)
          setDrawerVisibility(false)
        }}
        visible={drawerVisibility}>
        <div style={styles.formWrapper}>
          <Formik
            initialValues={selectedAlert}
            validationSchema={CreateAlertSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (selectedAlert) {
                await dispatch(updateEmergencyAlert(selectedAlert.id, values))
              } else {
                await dispatch(createAlert(values))
              }

              setSubmitting(false)
              setDrawerVisibility(false)
            }}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
              dirty
            }) => {
              return (
                <Form
                  onSubmit={handleSubmit}
                  layout='vertical'
                  autoComplete='off'
                  hideRequiredMark
                  style={styles.form}>
                  <GenericTextArea
                    label='Alert Message'
                    name='message'
                    rows={4}
                    values={values}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      disabled={!dirty}
                      loading={isSubmitting}>
                      {selectedAlert ? 'Update Alert' : 'Create Alert'}
                    </Button>
                  </Form.Item>
                </Form>
              )
            }}
          </Formik>
        </div>
      </Drawer>

      {/* header */}
      <div style={styles.headerWrapper}>
        <Input.Search
          placeholder='Search emergency alerts...'
          style={{ width: 240 }}
        />
        <Radio.Group
          value={filter}
          buttonStyle='solid'
          onChange={e => {
            const value = e.target.value
            setFilter(value)
          }}>
          <Radio.Button value='all'>
            <strong>All</strong>
          </Radio.Button>
          <Radio.Button value='active'>
            <strong>Active</strong>
          </Radio.Button>
          <Radio.Button value='archived'>
            <strong>Archived</strong>
          </Radio.Button>
        </Radio.Group>
        <Button
          icon='alert'
          type='dashed'
          onClick={() => setDrawerVisibility(true)}>
          Add Emergency Alert
        </Button>
      </div>

      {/* list of alerts */}
      <div style={styles.listWrapper}>
        <List
          style={styles.list}
          itemLayout='horizontal'
          pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
          dataSource={filteredAlerts}
          renderItem={alert => {
            const color = getTagColor(alert.status)
            return (
              <List.Item
                actions={[
                  <Tooltip
                    key={'edit-alert'}
                    placement='left'
                    title='Edit Alert'>
                    <Icon
                      type='edit'
                      style={{ fontSize: 18 }}
                      onClick={() => {
                        setSelectedAlert(alert)
                        setDrawerVisibility(true)
                      }}
                    />
                  </Tooltip>,
                  <Tooltip
                    key={'delete-alert'}
                    placement='left'
                    title='Archive Alert'>
                    <Popconfirm
                      placement='top'
                      title='Are you sure you want to archive this alert?'
                      okText='Yes'
                      onConfirm={() =>
                        dispatch(
                          updateEmergencyAlert(alert.id, { status: 'archived' })
                        )
                      }
                      cancelText='No'>
                      <Icon type='container' style={{ fontSize: 18 }} />
                    </Popconfirm>
                  </Tooltip>
                ]}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={require(`../assets/images/wiwu-logo.png`)}
                      size={45}
                    />
                  }
                  title={<b>{alert.message}</b>}
                  description={
                    <>
                      <Tag color={color}>{alert.status.toUpperCase()}</Tag>
                      <span>
                        {moment(alert.date.toDate()).format(
                          'MMM DD, YYYY - hh:mmA'
                        )}
                      </span>
                    </>
                  }
                />
              </List.Item>
            )
          }}
        />
      </div>
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  },
  headerWrapper: {
    width: '70%',
    marginLeft: '15%',
    marginTop: 40,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    textAlign: 'left',
    width: '500px'
  },
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default EmergencyAlerts
