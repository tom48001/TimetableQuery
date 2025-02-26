router.beforeEach(async (to, from, next) => {
    const response = await fetch('http://localhost:3000/api/current-user', { credentials: 'include' });
    const user = await response.json();
  
    if (to.path !== '/login' && !user) {
      return next('/login');
    }
  
    if (to.meta.requiresAdmin && user.role !== 'manager') {
      return next('/home');
    }
  
    next();
  });
  