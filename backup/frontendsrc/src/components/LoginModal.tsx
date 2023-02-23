import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";
import TextInputField from "./form/TextInputField";
import styleUtils from '../styles/utils.module.css';

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccess: (user: User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccess}: LoginModalProps) => {
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<UsersApi.LoginCredentials>();

    async function onSubmit(input: UsersApi.LoginCredentials) {
        try {
            const user = await UsersApi.login(input);
            onLoginSuccess(user);
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default LoginModal;