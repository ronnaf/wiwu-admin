import React from 'react'
import { Layout, Form, Button, Avatar, Tag, Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { Helmet } from 'react-helmet'
import ProgressiveImage from 'react-progressive-image'

import { generateKey } from '../helpers/secret-key/generateKey'
import { editAdmin } from '../actions/admin/editAdmin.action'

import { EditAdminSchema } from '../schema/admin.schema'

import GenericInput from '../components/GenericInput'
import Spinner from '../components/Spinner'
import Spacer from '../components/Spacer'

const AccountForm = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
      }}
      validationSchema={EditAdminSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await dispatch(editAdmin(values, user.uid))
        setSubmitting(false)
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
            hideRequiredMark>
            <GenericInput
              required
              label='First Name'
              name='firstName'
              placeholder='e.g. - Juan'
              size={'large'}
              values={values}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <GenericInput
              required
              label='Last Name'
              name='lastName'
              placeholder='e.g. - Dela Cruz'
              size={'large'}
              values={values}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <GenericInput
              required
              label='Phone Number'
              name='phoneNumber'
              placeholder='e.g. - 09123456789'
              size={'large'}
              values={values}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Spacer height={32} />
            <Form.Item>
              <Button
                block
                type='primary'
                htmlType='submit'
                disabled={!dirty}
                size='large'
                loading={isSubmitting}>
                Update Account
              </Button>
            </Form.Item>
          </Form>
        )
      }}
    </Formik>
  )
}

const Settings = () => {
  const user = useSelector(state => state.admin.current)

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Settings - wiwu admin</title>
      </Helmet>

      <div>
        <ProgressiveImage
          src={
            user.avatar
              ? user.avatar
              : require('../assets/images/user-avatar.png')
          }
          placeholder='avatar'>
          {(src, loading) =>
            loading ? (
              <Spinner height={120} tip={''} />
            ) : (
              <Avatar src={src} size={120} />
            )
          }
        </ProgressiveImage>
        <Spacer height={16} />
        <Tag color='green'>
          <b>{user.role.toUpperCase()}</b>
        </Tag>
        <Spacer height={4} />
        <div style={{ fontWeight: 'bold' }}>{user.email}</div>
        <Spacer height={4} />
        <div style={{ color: 'grey' }}>{user.department}</div>

        <Spacer height={24} />
        <div style={{ width: 440 }}>
          {user.role === 'admin' ? (
            <Tabs defaultActiveKey='1'>
              <Tabs.TabPane tab='Account' key='1'>
                <Spacer height={16} />
                <AccountForm user={user} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Admin Powers' key='2'>
                <Spacer height={16} />
                <Form.Item>
                  <Button
                    block
                    type='primary'
                    htmlType='submit'
                    size={'large'}
                    onClick={() => generateKey()}>
                    Generate Admin Key
                  </Button>
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>
          ) : (
            <AccountForm user={user} />
          )}
        </div>
      </div>
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Settings
