import { axiosCanvas } from '.';

export async function getCanvasCourse() {
    const res = await axiosCanvas.get(`courses`);
    return res.data;
  }