

const BIN_ID = process.env.JSONBIN_BIN_ID;
const SOCIAL_BIN_ID = process.env.JSONBIN_SOCIAL_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const SOCIAL_BASE_URL = `https://api.jsonbin.io/v3/b/${SOCIAL_BIN_ID}`;

export async function getJsonBinData() {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch JSONBin:", res.status, await res.text());
      return null;
    }

    const json = await res.json();

    return json.record;
  } catch (err) {
    console.error("Error fetching JSONBin:", err);
    return null;
  }
}

export async function updateJsonBinData(updatedData) {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2a$10$MFOT574vMni3DolkxtFEcuObvjqx1PclBv1g9IvYYlhJcUKt0HGd.",
    },
    body: JSON.stringify(updatedData),
  });
  return res.ok;
}


export async function getSocialData() {
  try {
    const res = await fetch(SOCIAL_BASE_URL, {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch JSONBin:", res.status, await res.text());
      return null;
    }

    const json = await res.json();

    return json.record;
  } catch (err) {
    console.error("Error fetching JSONBin:", err);
    return null;
  }
}

export async function updateSocialData(updatedData) {
  const res = await fetch(SOCIAL_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2a$10$MFOT574vMni3DolkxtFEcuObvjqx1PclBv1g9IvYYlhJcUKt0HGd.",
    },
    body: JSON.stringify(updatedData),
  });
  return res.ok;
}
