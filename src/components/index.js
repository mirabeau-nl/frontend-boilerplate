/* eslint-disable global-require */

export default require('./**/!(*.Spec).js', {
  mode: 'hash',
  resolve: ['reduce', 'strip-ext']
})
