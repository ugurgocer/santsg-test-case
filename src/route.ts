import HomePage from '@/pages/Home';
import type RouteConfig from '@/types/IRouteConfig';
import EPermissions from '@/types/EPermissions';

const translations = () => Promise.resolve();

const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    renderer: {
      type: 'element',
      component: HomePage,
    },
    permissions: [EPermissions.VIEW_POSTS, EPermissions.VIEW_COMMENTS],
    translations
  },
  {
    name: 'login',
    path: '/login',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/Login'),
    },
    translations
  },
  {
    name: 'posts',
    path: '/posts',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/Post'),
    },
    permissions: [EPermissions.VIEW_POSTS],
    translations
  },
  {
    name: 'post',
    path: '/post/:id',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/Post'),
    },
    permissions: [EPermissions.VIEW_POSTS],
    translations
  },
  {
    name: 'editPost',
    path: '/post/:id/edit',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/Post/Edit'),
    },
    permissions: [EPermissions.EDIT_POST],
    translations
  },
  {
    name: 'createPost',
    path: '/post/create',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/Post/Create'),
    },
    permissions: [EPermissions.CREATE_POST],
    translations
  },
  {
    name: 'postComments',
    path: '/post/:id/comments',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/Post/Comments'),
    },
    permissions: [EPermissions.VIEW_COMMENTS],
    translations
  },
  {
    name: 'forbidden',
    path: '/403',
    renderer: {
      type: 'lazy',
      component: () => import('@/pages/errors/Forbidden'),
    },
    translations
  }
];

export default routes;