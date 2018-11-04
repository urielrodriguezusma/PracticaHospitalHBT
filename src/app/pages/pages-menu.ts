import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Nombre Proyecto',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Menu Principal',
    icon: 'nb-grid-a',
    children: [
      {
        title: 'Usuarios',
        link: '/pages/components/usuarios',
      },
      {
        title: 'Productos',
        link: '/pages/components/productos',
      },
      {
        title: 'Nuevo Paciente',
        link: '/pages/components/nuevopaciente',
      },
      {
        title: 'Pacientes',
        link: '/pages/components/pacientes',
      }
     
    ]
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
