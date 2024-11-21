let TP_SERVER_DOMAIN, AGGR_DOMAIN;

if (import.meta.env.VITE_APP_ENV === 'production') {
    TP_SERVER_DOMAIN = 'https://preserver.mytokenpocket.vip';
    AGGR_DOMAIN = 'https://aggserver.mytokenpocket.vip'
}
else if (import.meta.env.VITE_APP_ENV === 'beta') {
    TP_SERVER_DOMAIN = 'https://betaserver.mytokenpocket.vip';
    AGGR_DOMAIN = 'https://aggserver.mytokenpocket.vip'
}
else if (import.meta.env.VITE_APP_ENV === 'development') {
    TP_SERVER_DOMAIN = 'https://testserver.mytokenpocket.vip';
    AGGR_DOMAIN = 'https://agtest.mytokenpocket.vip'
}

export { TP_SERVER_DOMAIN, AGGR_DOMAIN }