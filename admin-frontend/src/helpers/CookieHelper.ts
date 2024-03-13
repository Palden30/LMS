const CookieHelper = (() => {
  const cookie = document.cookie;

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires;
  };

  const getCookie = (c_name: string) => {
    const ls = cookie.split(';');
    const reqCookie = ls.find((c) => c.includes(c_name));
    if (reqCookie) {
      return reqCookie.split('=')[1];
    }
    return '';
  };

  const deleteCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  return { getCookie, deleteCookie, deleteAllCookies, setCookie };
})();

export default CookieHelper;
