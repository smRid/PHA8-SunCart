const SESSION_COOKIE = "suncart.session";

function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return match ? match.slice(name.length + 1) : null;
}

export const auth = {
  api: {
    async getSession({ headers } = {}) {
      const rawSession = getCookieValue(headers?.get("cookie"), SESSION_COOKIE);

      if (!rawSession) {
        return null;
      }

      try {
        return JSON.parse(decodeURIComponent(rawSession));
      } catch {
        return null;
      }
    },
  },
};
