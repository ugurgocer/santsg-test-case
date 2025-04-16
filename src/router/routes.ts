import HomePage from '@/pages/Home';
import type RouteConfig from '@/types/IRouteConfig';
import EPermissions from '@/types/EPermissions';
import Forbidden from '@/pages/errors/Forbidden';

const translations = () => Promise.resolve(true);

const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    renderer: {
      type: 'element',
      element: HomePage,
    },
    permissions: [EPermissions.VIEW_POSTS, EPermissions.VIEW_COMMENTS],
    translations
  },
  {
    name: 'login',
    path: '/login',
    renderer: {
      type: 'lazy',
      element: () => import('@/pages/Login'),
    },
    translations
  },
  {
    name: 'posts',
    path: '/posts',
    renderer: {
      type: 'lazy',
      element: () => import('@/pages/Posts'),
    },
    permissions: [EPermissions.VIEW_POSTS],
    translations
  },
  {
    name: 'post',
    path: '/post/:id',
    renderer: {
      type: 'lazy',
      element: () => import('@/pages/Post'),
    },
    permissions: [EPermissions.VIEW_POSTS],
    translations,
    children: [
      {
        name: 'editPost',
        path: '/post/:id/edit',
        renderer: {
          type: 'lazy',
          element: () => import('@/pages/Post/Edit'),
        },
        permissions: [EPermissions.EDIT_POST],
        translations
      },
      {
        name: 'postComments',
        path: '/post/:id/comments',
        renderer: {
          type: 'lazy',
          element: () => import('@/pages/Post/Comments'),
        },
        permissions: [EPermissions.VIEW_COMMENTS],
        translations
      }
    ]
  },

  {
    name: 'createPost',
    path: '/post/create',
    renderer: {
      type: 'lazy',
      element: () => import('@/pages/Post/Create'),
    },
    permissions: [EPermissions.CREATE_POST],
    translations
  },
  {
    name: 'forbidden',
    path: '/403',
    renderer: {
      type: 'element',
      element: Forbidden,
    },
    translations
  },
  {
  name: 'notFound',
  path: '*',
  renderer: {
    type: 'element',
    element: Forbidden,
  },
}
];

export default routes;