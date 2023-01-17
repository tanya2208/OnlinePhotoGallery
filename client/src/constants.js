export const Constants = {
    routes: {
        login: '/login',
        register: '/register',
        home: '/',
        profile: '/users/:userId',
        post: '/posts/:postId'
    }, 

    localStorage: {
        authToken: 'authToken'
    },

    http: {
        url: 'http://localhost:1337'
    },

    path: {
        login: '/users/login',
        register: '/users/register',
        user: '/users',
        image: '/images',
        post: '/posts'
    }
}