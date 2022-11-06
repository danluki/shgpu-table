import axios from "axios";

export const getGroupByName = async (name: string): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/groups/${name}`
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && (e.status === 400 || e.status === 404)) {
      console.log(e.message);
      return null;
    } else {
      throw new Error("Internal server error");
    }
  }
};
