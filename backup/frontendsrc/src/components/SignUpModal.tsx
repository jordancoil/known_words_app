import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";
import TextInputField from "./form/TextInputField";
import styleUtils from '../styles/utils.module.css';

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccess: (user: User) => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccess}: SignUpModalProps) => {
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<UsersApi.SignUpCredentials>();

    async function onSubmit(input: UsersApi.SignUpCredentials) {
        try {
            const newUser = await UsersApi.signUp(input);
            onSignUpSuccess(newUser);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
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
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="email@example.com"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}
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
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default SignUpModal;