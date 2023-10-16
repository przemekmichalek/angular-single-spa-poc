import { registerApplication, start } from 'single-spa';

registerApplication(
  'product-image',
  () => import('productImage/ProductImage'),
  location => location.pathname.startsWith('/')
);

// registerApplication(
//   'header',
//   () => import('nav/Header'),
//     location => location.pathname.startsWith('/')
// );

registerApplication({
    name: 'header',
    app: () => import('nav/Header'), // Adjust this if your import statement is different
    activeWhen: '/header',
    // ... other configuration ...
});

registerApplication(
  'footer',
  () => import('nav/Footer'),
  location => location.pathname.startsWith('/')
);

registerApplication(
  'buy-tools',
  () => import('buyTools/BuyTools'),
  location => location.pathname.startsWith('/')
);

registerApplication(
    'sdepangular',
    () => import('sdepangular/Component'),
    location => location.pathname.startsWith('/')
);

start();
