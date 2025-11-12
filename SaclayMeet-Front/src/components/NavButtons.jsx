import "./NavButtons.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const NavButtons = ({name1, name2, name3, path1, path2, path3, current = "first", inline = true}) => {
    const navigate = useNavigate();
    return (
        <div className="navigation-buttons">
            {/* Affichage si on est sur la première page */}
            {current === "first" && (
                <div className={`profile-buttons ${inline ? "inline" : "block"}`}>
                    <Button color="salmon" variant="contained" onClick={() => navigate(path1)}>{name1}</Button>
                    <Button color="inherit" onClick={() => navigate(path2)}>{name2}</Button>
                    <Button color="inherit" onClick={() => navigate(path3)}>{name3}</Button>
                </div>
            )}
            {/* Affichage si on est sur la deuxième page */}
            {current === "second" && (
                <div className={`profile-buttons ${inline ? "inline" : "block"}`}>
                    <Button color="inherit" onClick={() => navigate(path1)}>{name1}</Button>
                    <Button color="salmon" variant="contained" onClick={() => navigate(path2)}>{name2}</Button>
                    <Button color="inherit" onClick={() => navigate(path3)}>{name3}</Button>
                </div>
            )}
            {/* Affichage si on est sur la troisième page */}
            {current === "third" && (
                <div className={`profile-buttons ${inline ? "inline" : "block"}`}>
                    <Button color="inherit" onClick={() => navigate(path1)}>{name1}</Button>
                    <Button color="inherit" onClick={() => navigate(path2)}>{name2}</Button>
                    <Button color="salmon" variant="contained" onClick={() => navigate(path3)}>{name3}</Button>
                </div>
            )}
        </div>
    );
}

export default NavButtons;