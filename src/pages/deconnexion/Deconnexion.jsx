import { useState } from "react";
import hablamundo from "../../assets/logos/hablamundo.png"
import './deconnexion.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchData } from "../../helpers/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export const Deconnexion = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [connect, setConnect] = useState(true);
    const [etat, setEtat] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm();
    const changesEyes = ()=>{
        setEtat(!etat)
    }
    const onSubmit = (data) => {
        console.log(data)
        setLoading(true)
        setConnect(false)
        fetchData("https://www.backend.habla-mundo.com/api/v1/login",data).then((result)=>{
         
            console.log(result)
              
            //   if(result.message === "Utilisateur créé avec succès"){
            //     return dispatch(setAuth(result)),snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),navigate("/login")
            //   }
            //   else if(result.messageError === 'cet email existe deja veuillez changer d adresse'){
            //      snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
            //   }
            //   else if(result.message === 'Erreur lors de lenvoi de le-mail de confirmation'){
            //     return alert("probleme de connexion")
            //   }
              
             })
             .catch((error) => {
              console.log({message:error.message});
              
            }).finally(()=>{
              setLoading(false)
              setConnect(true)
            })
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
                                value: /^\S+@\S+$/i,
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
                    {connect && <button type="submit" className='connexion'>CONNEXION</button>}
                    {loading && <button type="submit" className='connexion'>PATIENTEZ ....</button>}
                </form>
            </div>

        </div>
    )
}