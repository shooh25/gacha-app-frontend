import instance from "./client";

export const execItem = () => {
  return instance.get('/items')
}