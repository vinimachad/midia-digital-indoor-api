import path from 'path'
export default {
  '@controllers': path.join(__dirname, '..', '..', 'controllers'),
  '@routes': path.join(__dirname, '..', '..', 'routes'),
  '@usecases': path.join(__dirname, '..', '..', 'use-cases'),
  '@entities': path.join(__dirname, '..', '..', 'entities'),
  '@configs': path.join(__dirname, '..', '..', 'config'),
  '@repositories': path.join(__dirname, '..', '..', 'repositories'),
  '@middlewares': path.join(__dirname, '..', '..', 'middlewares'),
  '@models': path.join(__dirname, '..', '..', 'models'),
  '@type': path.join(__dirname, '..', '..', 'types'),
  '@factories': path.join(__dirname, '..', '..', 'factories')
}
