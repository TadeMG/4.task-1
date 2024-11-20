import { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';

const sendFormData = (data) => {
	console.log(data);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPassword, setRepeatPassword] = useState('');
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const isDisabled =
		!!emailError ||
		!!passwordError ||
		!!repeatPasswordError ||
		email.length === 0 ||
		password.length === 0 ||
		repeatPassword !== password;

	useEffect(() => {
		if (!isDisabled) {
			submitButtonRef.current.focus();
		}
	}, [isDisabled]);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;

		if (!/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(target.value)) {
			newError = 'Введён невалидный email.';
		}

		setEmailError(newError);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
	};

	const onPasswordBlur = ({ target }) => {
		let newError = null;

		if (target.value.length < 8) {
			newError = 'Пароль должен быть не меньше 8 символов.';
		}

		setPasswordError(newError);
	};

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);
	};

	const onRepeatPasswordBlur = ({ target }) => {
		let newError = null;

		if (target.value !== password) {
			newError = 'Пароли не совпадают.';
		}

		setRepeatPasswordError(newError);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, repeatPassword });
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Регистрация</h1>
			<form className={styles.registerForm} onSubmit={onSubmit}>
				<div className={styles.inputBlock}>
					<input
						className={styles.inputForm}
						name="email"
						type="email"
						value={email}
						placeholder="Введите email"
						onChange={onEmailChange}
						onBlur={onEmailBlur}
					/>
					{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				</div>
				<div className={styles.inputBlock}>
					<input
						className={styles.inputForm}
						name="password"
						type="password"
						value={password}
						placeholder="Введите пароль"
						onChange={onPasswordChange}
						onBlur={onPasswordBlur}
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
						value={repeatPassword}
						placeholder="Введите пароль повторно"
						onChange={onRepeatPasswordChange}
						onBlur={onRepeatPasswordBlur}
					/>
					{repeatPasswordError && (
						<div className={styles.errorLabel}>{repeatPasswordError}</div>
					)}
				</div>
				<button
					ref={submitButtonRef}
					className={styles.registerButton}
					disabled={isDisabled}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
