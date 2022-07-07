<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
	import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
	import { setClient, query, mutation } from "svelte-apollo";	

	const client = new ApolloClient({
		uri: "http://localhost:3000/graphql",
		cache: new InMemoryCache()
	});
	setClient(client);

	/*const LOGIN = gql`
		mutation User($email: String, $password: String) {
			login(email: "lisa@simpson.com", password: "secret42") {
				accessToken
				refreshToken
				user {
					id
					email
				}
			}
		}
	`;*/
	const LOGIN = gql`
		mutation User($email: String!, $password: String!) {
			login(data: {email: $email, password: $password}) {
				...AuthTokens
			}
		}

		fragment UserData on User {
			id
			email
		}

		fragment AuthTokens on Auth {
			accessToken
			refreshToken
			user {
				...UserData
			}
		}
	`;
	const login = mutation(LOGIN);

	function handleSubmit(event) {
		const data = new FormData(event.target);
		(async () => {
			const email = data.get("user");
			const password = data.get("pass");
			await login({variables: { email, password } });
			
			event.target.reset();
		})().catch(error => {
			// TODO
			console.error(error);
		})
	}
</script>

<main>
	<form on:submit|preventDefault="{handleSubmit}">
		<label>Username <input type="text" name="user" /></label>
		<label>Password <input type="password" name="pass" /></label>
	
		<button type="submit">Login</button>
	</form>

	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
