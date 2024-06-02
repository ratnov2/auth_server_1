const users = [
  {
    id: 1,
    name: "John",
    age: 30,
    email: "an5@ya.ru",
    password: "111111",
    delayAccessToken: 1000 * 60,
    delayRefreshToken: 1000 * 60,
    accessToken: "tt123456789",
    refreshToken: "fe123456789",
    isAdmin: false,
  },
];
type IUser = {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
};

const defaultDelay = 500;

export const server_login = ({ email, password }: any) => {
  return new Promise<IUser>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.email === email);
      console.log(user);
      if (!user) return reject({ message: "User not found", status: 401 });
      if (user.password !== password)
        return reject({ message: "Wrong password", status: 401 });
      resolve(user);
    }, Math.random() * defaultDelay);
  });
};

export const server_check_auth = ({ refreshToken }: any) => {
  return new Promise<IUser>((resolve, reject) => {
    setTimeout(() => {
      resolve(users[0]);
    }, Math.random() * defaultDelay);
  });
};
