import { useState } from "react";
import hablamundo from "../../assets/logos/hablamundo.png"
import './deconnexion.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchData } from "../../helpers/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { snackbbar } from "../../helpers/snackbars";
import infos  from  "../../assets/icons/infos.svg"
export const Deconnexion = () => {
    const navigate = useNavigate();
    const [connect, setConnect] = useState(false);
    const [etat, setEtat] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm();
    let message1 = "Demande prise en compte";
    let message2 = "Demande non prise en compte";
    const changesEyes = ()=>{
        setEtat(!etat)
    }
    console.log(infos)
    const onSubmit = async (data) => {
        setConnect(true)
        try {
            const result = await fetchData("login",data);

            if (result.access_token) {
                snackbbar(document.querySelector("#body"), infos,message1, 2000);
                localStorage.setItem("token",result.access_token);
                localStorage.setItem("userId",result.user.id);

                
                // Attendre que la snackbar disparaisse avant de rediriger
                setTimeout(() => {
                    navigate("/home");
                }, 2000);  
            }
            
            if (result.message === "Invalid login credentials") {
                snackbbar(document.querySelector("#body"), infos,message2, 3000);
            }
        } catch (error) {
            setEtat(true);
            console.log({ message: error.message });
        } finally {
            setConnect(false);
        }
    }
    return (
        <div className="deconnexion_compte">
            <img src={hablamundo} alt="hablamundo" className="hablamundo_form" />
            <div className='parent_form'>
                <h1>CONNEXION ADMIN</h1>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='space_signup'>
                        <label htmlFor="email">Adresse mail</label>
                        <input type="text" placeholder='Entrer votre adresse mail' name = "email" {...register("email", {
                            required: "Veuillez entrer votre adresse e-mail",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Mauvaise syntaxe d'email",
                            },
                        })} />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>
                    <div className='space_signup'>
                        <label htmlFor="password">Mot de passe</label>
                        {etat?<input type="text" placeholder='Entrer votre mot de passe' name="password" {...register("password", { required: "Veuillez entrer votre mot de passe" })} />:<input type="password" placeholder='Entrer votre mot de passe' name="password" {...register("password", { required: "Veuillez entrer votre mot de passe" })} />}
                        {etat?<FontAwesomeIcon icon={faEye} className="eyes" onClick={changesEyes}/>:
                        <FontAwesomeIcon icon={faEyeSlash} className="eyes" onClick={changesEyes}/>}
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>
                    <div className='forgot_password'>
                        <span></span><span>mot de passe oublié</span>
                    </div>
                    {connect ? <button type="submit" className='connexion'>PATIENTEZ ....</button>:<button type="submit" className='connexion'>CONNEXION</button>}

                </form>
            </div>

        </div>
    )
}