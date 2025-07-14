const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID;
const API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY;
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const HEADERS = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};
export async function fetchApps() {
  const res = await fetch(API_URL, {
    headers: HEADERS,
    cache: "no-store",
  });

  const json = await res.json();
  return json.record.apps; 
}

export async function updateApps(apps) {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2a$10$MFOT574vMni3DolkxtFEcuObvjqx1PclBv1g9IvYYlhJcUKt0HGd.",
    },
    body: JSON.stringify({ apps }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Update failed: ${err}`);
  }

  return res.json();
}
