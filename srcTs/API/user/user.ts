import { getUrl, ip, port } from "../serverAdress";
import { APIError } from "../APIError";
import { User } from "../entity/entity"


export const userCreate = async (user: User): Promise<Response> => {
  const url = getUrl + `/user/create`;

  try {
    const res = fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Name: user.Name,
        Password: user.Password,
        Email: user.Email, // Make sure to include the Email in the request body.
      }),
    });


    return res;
  } catch (error) {
    // Handle other errors, e.g., network issues, etc.
    console.log("this is a issue")
    throw new Error("Failed to create user");
  }
};


export const userDelete = async (user: User): Promise<Response> => {
  const url = getUrl + `/user/delete`;

  try {
    const res = fetch(url, {
      method: "POST",
      headers: {
        'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
      },
      body: JSON.stringify({}),
    });


    return res;
  } catch (error) {
    // Handle other errors, e.g., network issues, etc.
    console.log("this is a issue")
    throw new Error("Failed to create user");
  }
};
