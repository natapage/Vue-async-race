const base = "http://localhost:3000";

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page, limit = 7) => {
  const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await responce.json(),
    count: responce.headers.get("X-Total-Count"),
  };
};

export const getCar = async (id) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body) =>
  (
    await fetch(garage, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    })
  ).json();

export const deleteCar = async (id) =>
  (await fetch(`${garage}/${id}`, { method: "DELETE" })).json();

export const updateCar = (async (body, id) =>
  await fetch(`${garage}/${id}`, {
    method: PUT,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  })).json();

export const startEngine = (async (id) =>
  await fetch(`${garage}/${id}&status=started`)).json();

export const stopEngine = (async (id) =>
  await fetch(`${garage}/${id}&status=stopped`)).json();
