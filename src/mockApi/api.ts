export const registerUser = (userData: {
    firstName: string;
    lastName: string;
    profilePic?: string;
    userName: string;
    password: string;
  }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1
          ? resolve({ message: "Registration successful", userData })
          : reject({
              message: "something went wrong",
            });
      }, 2000);
    });
  };