import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as UsersApis from "../network/users_api"

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccess: () => void,
}

const NavBarLoggedInView = ({user, onLogoutSuccess}: NavBarLoggedInViewProps) => {
    async function logout () {
        try {
            await UsersApis.logout();
            onLogoutSuccess();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return ( 
        <>
        <Navbar.Text className="me-2">
            {user.username}
        </Navbar.Text>
        <Button onClick={logout}>
            Logout
        </Button>
        </>
     );
}
 
export default NavBarLoggedInView;