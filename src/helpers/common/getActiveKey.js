export const getActiveKey = location => {
  const { pathname } = location
  const paths = pathname.split('/')
  const activeKey = paths[2]
  return activeKey
}
