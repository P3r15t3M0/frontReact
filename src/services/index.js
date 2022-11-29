import jwt_decode from "jwt-decode";

export const getAllServs = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }
    
    return json.info;
};

export const getServ = async (id, token) => {
    console.log("ID TOKEN", id, token)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}serv/${id}`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }
    
    return json.info;
};

export const registerUserService = async ({email, password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, pssw: password}),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};

export const logUserService = async ({email, password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, pssw: password}),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.token;
};

export const getMyUserData = async ({token}) => {
    const tDec = jwt_decode(token);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}userParams`, {
        headers: {
            Authorization: token,
        },
        body: JSON.stringify(tDec.id),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};

export const createNewServiceService = async (data, token) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}createService`, requestOptions);
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};

export const deleteMyServByIdService = async (idServ, token) => {
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}delIdServ/${idServ}`, requestOptions);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};

export const newCommentaryService = async (idServ, mail, com, token) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({id: idServ, email: mail, comment: com}),
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}addCom`, requestOptions);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};


export const getAllComms = async (id, token) => {    
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}allComOneServ/${id}`, requestOptions);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.message;
};

export const newJobService = async (idServ, idOwner, idWorker, token) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({idServ: idServ, idUserOff: idOwner, idUserRec: idWorker}),
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}newJob`, requestOptions);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};


export const jobChecker = async (idUs, idServ, token) => {
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({id: idUs, idS: idServ}),
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}imInThatJob`, requestOptions);
    const json = await response.json();
    console.log('response', response);
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};

export const uploadFile = async (idJob, idUs, file, name, token) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            Authorization: `${token}`
        },
        body: JSON.stringify({ijob: idJob, idus: idUs, file: file, name: name}),
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}uploadFile`, requestOptions);
    const json = await response.json();
    //console.log('response', json);
    if (!response.ok) {
        throw new Error(json.message);
    }
    
    return json;
};

export const updateUser = async (alias, bio, photo, fecNac, token) => {
    
    const requestOptions = {
        method: 'PATCH',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({al: alias, bio: bio, fp: photo, fc: fecNac}),
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}uploadFile`, requestOptions);
    const json = await response.json();
    //console.log('response', json);
    if (!response.ok) {
        throw new Error(json.message);
    }
    
    return json;
};

export const checkIfSolved = async (id, token) => {    
    
    const requestOptions = {
        method: 'GET',
        headers: { 
            Authorization: `${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({id: id}),
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_ROUTE}solved`, requestOptions);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.message;
};