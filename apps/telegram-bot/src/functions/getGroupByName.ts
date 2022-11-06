import axios from "axios";

export const getGroupByName = async (name: string): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/groups/${name}`
    );
    return response.data;
  } catch (e) {
    if (
      axios.isAxiosError(e) &&
      (e.response?.status === 400 || e.response?.status === 404)
    ) {
      console.log(e.message);
      return null;
    }
  }
};
