import { serialize, parse } from "cookie";

export const MAX_AGE = 60 * 60 * 24 * 30;

export function setCookie(cookieName, value, age) {
  if (!age) age = MAX_AGE;
  if (age === 0) {
    // only set session cookie
    document.cookie = `${cookieName}=${value};path=/;`;
  } else {
    const cookie = serialize(cookieName, value, {
      maxAge: age,
      expires: new Date(Date.now() + age * 1000),
      secure: process.env.NODE_ENV === "production",
      path: "/",
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      sameSite: "lax",
    });
    document.cookie = cookie;
  }
}

export function removeCookie(cookieName) {
  const cookie = serialize(cookieName, "", {
    maxAge: -1,
    path: "/",
  });
  document.cookie = cookie;
}

export function getCookie(cookieName) {
  let cookie = {};
  if (typeof window !== "undefined") {
    cookie = parse(document.cookie);
  }
  /*
      document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
      })
      */
  return cookie[cookieName];
}
