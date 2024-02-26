const getCookie = (name: string) => {
  const value = '; ' + document.cookie;
  const parts = value.split(`; ${name}=`);
  const cookie = parts?.pop()?.split(';').shift();
  return cookie;
};

export default getCookie;