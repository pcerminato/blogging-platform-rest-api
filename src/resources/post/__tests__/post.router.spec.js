import postRouter from '../post.router'

describe('Post Router', () => {
  test('Every resource has every route configured', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/', method: 'post' },
      { path: '/:id', method: 'delete' },
      { path: '/drafts', method: 'get' },
      { path: '/search', method: 'get' }
    ]

    routes.forEach(route => {
      const match = postRouter.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})
