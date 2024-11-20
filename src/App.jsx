import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useEffect, useRef } from 'react';

const sendFormData = (data) => {
	console.log(data);
};

const registerSchema = yup.object().shape({
	email: yup
		.string()
		.required('Введите email.')
		.matches(
			/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
			'Введён невалидный email.',
		),
	password: yup
		.string()
		.required('Введите пароль.')
		.min(8, 'Пароль должен быть не меньше 8 символов.'),
	confirmPassword: yup
		.string()
		.required('Подтвердите пароль.')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают.'),
});

export const App = () => {
	const submitButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerSchema),
		mode: 'onTouched',
	});

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Регистрация</h1>
			<form className={styles.registerForm} onSubmit={handleSubmit(sendFormData)}>
				<div className={styles.inputBlock}>
					<input
						className={styles.inputForm}
						name="email"
						type="email"
						placeholder="Введите email"
						{...register('email')}
					/>
					{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				</div>
				<div className={styles.inputBlock}>
					<input
						className={styles.inputForm}
						name="password"
						type="password"
						placeholder="Введите пароль"
						{...register('password')}
					/>
					{passwordError && (
						<div className={styles.errorLabel}>{passwordError}</div>
					)}
				</div>
				<div className={styles.inputBlock}>
					<input
						className={styles.inputForm}
						name="password"
						type="password"
						placeholder="Подтвердите пароль"
						{...register('confirmPassword')}
					/>
					{confirmPasswordError && (
						<div className={styles.errorLabel}>{confirmPasswordError}</div>
					)}
				</div>
				<button
					ref={submitButtonRef}
					className={styles.registerButton}
					disabled={!isValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
