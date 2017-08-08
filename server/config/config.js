import _ from 'lodash'
import development from './development'
import production from './production'
import test from './test'

export const env = process.env.NODE_ENV || 'development'

const configs = {
  development: development,
  test: test,
  production: production
}

const defaultConfig = {
  env: env
}
// merge 组合两个对象成为一个对象
const config = _.merge(defaultConfig, configs[env])

export default config