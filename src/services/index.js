//import jwt_decode from "jwt-decode";

export const getAllServs = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.info;
};

export const getServ = async (id, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}serv/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const registerUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, pssw: password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const logUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, pssw: password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.token;
};

export const getMyUserData = async ({ token }) => {
  //const tDec = jwt_decode(token);
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}userParams`,
    {
      headers: {
        Authorization: token,
      },
      //body: JSON.stringify(tDec.id),
    }
  );

  const json = await response.json();
  //console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getUserById = async (token, idCreator) => {
  const requestOptions = {
    //method: 'GET',
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idCreator: idCreator }),
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}userCreatorInfo`,
    requestOptions
  );

  const json = await response.json();
  //console.log('JSONUSER', json);
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const createNewServiceService = async (
  id,
  title,
  servGroup,
  desc,
  file,
  token
) => {
  const payload = new FormData();
  payload.append("idUser", id);
  payload.append("title", title);
  payload.append("desc", desc);
  payload.append("servGroup", servGroup);

  if (file && file !== "") {
    payload.append("file", file);
  }

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
    body: payload,
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}createService`,
    requestOptions
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const deleteMyServByIdService = async (idServ, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}delIdServ/${idServ}`,
    requestOptions
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const newCommentaryService = async (idServ, mail, com, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idServ, email: mail, comment: com }),
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}addCom`,
    requestOptions
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getAllComms = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}allComOneServ/${id}`,
    requestOptions
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.message;
};

export const newJobService = async (idServ, idOwner, idWorker, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idServ: idServ,
      idUserOff: idOwner,
      idUserRec: idWorker,
    }),
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}newJob`,
    requestOptions
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const jobChecker = async (idUs, idServ, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idUs, idS: idServ }),
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}imInThatJob`,
    requestOptions
  );
  const json = await response.json();
  //console.log('response', response);
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const uploadFile = async (idServ, idUs, file, token) => {
  const payload = new FormData();
  payload.append("idServ", idServ);
  payload.append("idUs", idUs);
  payload.append("file", file);

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
    body: payload,
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}uploadFile`,
    requestOptions
  );
  const json = await response.json();
  //console.log('response', json);
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const updateUser = async (
  id,
  alias,
  email,
  passO,
  passN,
  bio,
  photo,
  fecNac,
  token
) => {
  const payload = new FormData();
  payload.append("id", id);
  payload.append("al", alias);
  payload.append("em", email);
  payload.append("pssO", passO);
  payload.append("pssN", passN);
  payload.append("bio", bio);
  if (photo) {
    payload.append("avatar", photo);
  }
  payload.append("fc", fecNac);

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
    },
    body: payload,
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}modifyUser`,
    requestOptions
  );
  const json = await response.json();
  //console.log('response', json);
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const checkIfSolved = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}solved`,
    requestOptions
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.message;
};

export const solvJob = async (idServ, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
    },
  };
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_ROUTE}solved/${idServ}`,
    requestOptions
  );
  const json = await response.json();
  //console.log('response', json);
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
