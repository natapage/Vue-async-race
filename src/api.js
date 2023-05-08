const base = "http://localhost:3000";

const garage = `${base}/garage`;
const engine = `${base}/engine`;
// const winners = `${base}/winners`;

export const getCars = async (page, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get("X-Total-Count"),
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

export const updateCar = async (body, id) =>
  (
    await fetch(`${garage}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    })
  ).json();

export const startEngine = async (id) =>
  (
    await fetch(`${engine}?id=${id}&status=started`, {
      method: "PATCH",
    })
  ).json();

export const stopEngine = async (id) =>
  (
    await fetch(`${engine}?id=${id}&status=stopped`, {
      method: "PATCH",
    })
  ).json();

export const driveMode = async (id) =>
  (await fetch(`${engine}?id=${id}&status=drive`, { method: "PATCH" })).json();
