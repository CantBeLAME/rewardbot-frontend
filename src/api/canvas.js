import { axiosCanvas } from '.';
import axios from 'axios';
import JSONBigInt from 'json-bigint';
import { getCanvasToken } from '../store/token';

export async function getCanvasCourse() {
  try {
    const canvasToken = getCanvasToken();

    axiosCanvas.defaults.headers.common['Authorization'] = `Bearer ${canvasToken}`;
    const res = await axiosCanvas.get('/courses');

    console.log('Canvas course data:', res.data); // Debugging output
    return res.data;
  } catch (error) {
    console.error('Error fetching Canvas course data:', error.response?.data || error.message);
    
  }
}


const parseLinkHeader = (link) => {
  const re = /<([^>]+)>; rel="([^"]+)"/g;
  let arrRes;
  const ret = {};
  while ((arrRes = re.exec(link)) !== null) {
    ret[arrRes[2]] = {
      url: arrRes[1],
      page: arrRes[2],
    };
  }
  return ret;
};

export async function getPaginatedRequest(
  url,
  recurse = false
){
  try {
    const res = await axios.get(url, {
      transformResponse: [(data) => JSONBigInt.parse(data)],
    });

    if (recurse && 'link' in res.headers) {
      const parsed = parseLinkHeader(res.headers['link']);
      if (parsed && 'next' in parsed && parsed['next'].url !== url)
        return (res.data ).concat(
          (await getPaginatedRequest(parsed['next'].url, true)) 
        );
    }

    return res.data;
  } catch (err) {
    console.error(err);
    return []; // still return all successful pages if error instead of hanging
  }
}