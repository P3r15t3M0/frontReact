import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, registerUserService } from "../services";

export const RegPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [error, setError] = useState('');
    const [alias, setAlias] = useState('');
    const [fecNac, setFecNac] = useState('');
    const [bioText, setBioText] = useState('');
    const [photo, setPhoto] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        setError('');

        if(pass1 !== pass2) {
            setError('Las passwords no coinciden');
            return;
        }

        try {
            await registerUserService({email, password: pass1});
            await updateUser({alias, bioText, photo, fecNac});
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section>
            <h1>Register</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' required onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <label htmlFor='pass1'>Password</label>
                    <input type='password' id='pass1' name='pass1' required onChange={(e) => setPass1(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <label htmlFor='pass2'>Repita Password</label>
                    <input type='password' id='pass2' name='pass2' required onChange={(e) => setPass2(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <label htmlFor='alias'>Alias</label>
                    <input type='text' id='alias' name='alias' required onChange={(e) => setAlias(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <label htmlFor='date'>Fecha de Nacimiento</label>
                    <input type='date' id='date' name='date' required onChange={(e) => setFecNac(e.target.value)}/>
                </fieldset>
                <br />
                <fieldset>
                <legend>Biografía</legend>
                    <textarea 
                        id='comment' 
                        name="comment" 
                        rows="3" cols="55"
                        value={bioText}
                        onChange={e => setBioText(e.target.value)}>
                    </textarea>
                </fieldset>
                <fieldset>
                    <input type='file' id='photo' name='photo' onChange={(e) => setPhoto(e.target.value)}/>
                </fieldset>

                <button>Registrar</button>
                {error ? <p>{error}</p> : null}
            </form>
            <br />
            <form className='form2'>
            </form>
        </section>
    );
};