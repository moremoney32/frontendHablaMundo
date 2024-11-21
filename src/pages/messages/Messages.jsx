
import { useNavigate } from "react-router-dom"
import { MainRightMessages } from "../../components/componentNotRetulables/mainRight/mainRightMessages/MainRightMessages"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./messages.css"
import { useEffect, useState } from "react"

export const Messages = () => {
    const navigate = useNavigate()
    const [isTokenVerified, setIsTokenVerified] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate("/")
        } else {
            // Si le token existe, on peut éventuellement supprimer des éléments du localStorage ici
            localStorage.removeItem('notificationsNews'); // Exemple de suppression
            setIsTokenVerified(true) // On peut afficher les composants après cette étape
        }
    }, [navigate])

    // Rendu conditionnel : attendre la vérification du token avant d'afficher les composants
    if (!isTokenVerified) {
        return null // Ou tu peux retourner un loader/spinner ici
    }

    return (
        <div>
            <Header />
            <div className="parent_message">
                <SideBar />
                <MainRightMessages />
            </div>
        </div>
    )
}
